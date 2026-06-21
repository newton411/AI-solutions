import React, { createContext, useState, useCallback, useEffect } from 'react';
import { CHAIN_ID, RPC_URL, CONTRACT_ADDRESSES, toQuants, fromQuants } from '@/config/contracts';

export interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  balance: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  sendTransaction: (payload: TransactionPayload) => Promise<string>;
}

export interface TransactionPayload {
  function: string;           // e.g. "0xADDR::module::function"
  typeArguments: string[];
  functionArguments: unknown[];
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

function getStarKey() {
  return typeof window !== 'undefined' ? (window as any)?.starkey?.supra : null;
}

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress]       = useState<string | null>(null);
  const [isConnected, setConnected] = useState(false);
  const [isConnecting, setConnecting] = useState(false);
  const [balance, setBalance]       = useState('0');

  const fetchBalance = useCallback(async (addr: string) => {
    try {
      const res = await fetch(`${RPC_URL}/rpc/v1/accounts/${addr}/resources`);
      const data = await res.json();
      const coinResource = data?.find?.((r: any) =>
        r.type?.includes('0x1::coin::CoinStore<0x1::supra_coin::SupraCoin>')
      );
      const raw = coinResource?.data?.coin?.value ?? '0';
      setBalance(fromQuants(Number(raw)).toFixed(4));
    } catch {
      setBalance('0');
    }
  }, []);

  const connectWallet = useCallback(async () => {
    const starkey = getStarKey();
    if (!starkey) {
      window.open('https://starkey.me/', '_blank');
      alert('StarKey Wallet not found. Install it from starkey.me then refresh.');
      return;
    }
    setConnecting(true);
    try {
      await starkey.connect();
      const accounts: string[] = await starkey.account();
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setConnected(true);
        await fetchBalance(accounts[0]);
      }
    } catch (err: any) {
      console.error('Wallet connect failed:', err);
    } finally {
      setConnecting(false);
    }
  }, [fetchBalance]);

  const disconnectWallet = useCallback(() => {
    setAddress(null);
    setConnected(false);
    setBalance('0');
  }, []);

  // Submit a Move entry-function transaction via StarKey
  const sendTransaction = useCallback(async (payload: TransactionPayload): Promise<string> => {
    const starkey = getStarKey();
    if (!starkey || !address) throw new Error('Wallet not connected');

    const txPayload = {
      data: {
        type: 'entry_function_payload',
        function: payload.function,
        type_arguments: payload.typeArguments,
        arguments: payload.functionArguments,
      },
    };

    const txHash: string = await starkey.sendTransaction(txPayload);

    // Poll for confirmation (max 60s)
    const start = Date.now();
    while (Date.now() - start < 60_000) {
      await new Promise(r => setTimeout(r, 2000));
      try {
        const res  = await fetch(`${RPC_URL}/rpc/v1/transactions/by_hash/${txHash}`);
        const data = await res.json();
        if (data?.success === true)  { await fetchBalance(address); return txHash; }
        if (data?.success === false) throw new Error(data?.vm_status || 'Transaction failed');
      } catch (e: any) {
        if (!e.message?.includes('not found')) throw e;
      }
    }
    throw new Error('Transaction confirmation timeout');
  }, [address, fetchBalance]);

  // Listen for account / network changes
  useEffect(() => {
    const starkey = getStarKey();
    if (!starkey) return;
    const onAccount = (accounts: string[]) => {
      if (accounts.length === 0) disconnectWallet();
      else { setAddress(accounts[0]); fetchBalance(accounts[0]); }
    };
    starkey.on?.('accountChanged', onAccount);
    return () => starkey.removeListener?.('accountChanged', onAccount);
  }, [disconnectWallet, fetchBalance]);

  return (
    <WalletContext.Provider value={{
      address, isConnected, isConnecting, balance,
      connectWallet, disconnectWallet, sendTransaction,
    }}>
      {children}
    </WalletContext.Provider>
  );
};
