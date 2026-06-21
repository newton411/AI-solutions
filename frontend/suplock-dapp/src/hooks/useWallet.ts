import { useState, useEffect, useCallback } from 'react';
import { connectStarKey, getStarKey, getSupraBalance, submitTx, waitForTx, TxPayload } from '@/lib/supraClient';
import { CHAIN_ID } from '@/config/contracts';

export interface WalletState {
  address:    string | null;
  balance:    number;
  connected:  boolean;
  connecting: boolean;
  error:      string | null;
  chainId:    number | null;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null, balance: 0, connected: false,
    connecting: false, error: null, chainId: null,
  });

  const refreshBalance = useCallback(async (addr: string) => {
    const balance = await getSupraBalance(addr);
    setState(s => ({ ...s, balance }));
  }, []);

  const connect = useCallback(async () => {
    setState(s => ({ ...s, connecting: true, error: null }));
    try {
      const address = await connectStarKey();
      const sk = getStarKey()!;
      const { chainId } = await sk.getChainId();
      if (chainId !== CHAIN_ID) {
        throw new Error(`Wrong network. Switch StarKey to Supra Testnet (chain ID ${CHAIN_ID}).`);
      }
      const balance = await getSupraBalance(address);
      setState({ address, balance, connected: true, connecting: false, error: null, chainId });
    } catch (e) {
      setState(s => ({
        ...s, connecting: false,
        error: e instanceof Error ? e.message : 'Connection failed',
      }));
    }
  }, []);

  const disconnect = useCallback(async () => {
    const sk = getStarKey();
    if (sk) await sk.disconnect().catch(() => {});
    setState({ address: null, balance: 0, connected: false, connecting: false, error: null, chainId: null });
  }, []);

  // Submit tx + wait for confirmation + refresh balance
  const sendTransaction = useCallback(async (payload: TxPayload): Promise<string> => {
    if (!state.address) throw new Error('Wallet not connected');
    const hash = await submitTx(payload, state.address);
    await waitForTx(hash);
    await refreshBalance(state.address);
    return hash;
  }, [state.address, refreshBalance]);

  // Auto-reconnect on mount
  useEffect(() => {
    const sk = getStarKey();
    if (!sk) return;
    sk.account()
      .then(async (addr: string) => {
        if (addr) {
          const { chainId } = await sk.getChainId();
          const balance = await getSupraBalance(addr);
          setState({ address: addr, balance, connected: true, connecting: false, error: null, chainId });
        }
      })
      .catch(() => {});

    const onAccountChange = (accounts: unknown) => {
      const accs = accounts as string[];
      if (accs.length === 0) disconnect();
      else { setState(s => ({ ...s, address: accs[0] })); refreshBalance(accs[0]); }
    };
    sk.on('accountChanged', onAccountChange);
    return () => sk.off('accountChanged', onAccountChange);
  }, [disconnect, refreshBalance]);

  return { ...state, connect, disconnect, sendTransaction, refreshBalance };
}
