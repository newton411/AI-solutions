import { useState, useCallback } from 'react';
import { buildTxPayload, viewFunction } from '@/lib/supraClient';
import { PACKAGE_ADDRESS, MODULES, toQuants } from '@/config/contracts';
import { useWalletContext } from '@/context/WalletContext';

const ADDR = PACKAGE_ADDRESS;
const MOD  = MODULES.YIELD_VAULTS;

export function useYield() {
  const { address, sendTransaction } = useWalletContext();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const exec = useCallback(async (fn: () => Promise<string>): Promise<string> => {
    if (!address) throw new Error('Wallet not connected');
    setLoading(true);
    setError(null);
    try {
      return await fn();
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Transaction failed';
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [address]);

  /**
   * yield_vaults::deposit_and_split(account, vault_id, amount_usdc, registry_addr)
   * amount_usdc in USDC micro-units (6 decimals): 1 USDC = 1_000_000
   */
  const depositAndSplit = (vaultId: number, amountUsdc: number) =>
    exec(() =>
      sendTransaction(buildTxPayload(ADDR, MOD, 'deposit_and_split', [], [
        vaultId.toString(),
        Math.floor(amountUsdc * 1_000_000).toString(), // USDC 6 decimals
        ADDR, // registry_addr
      ])),
    );

  /**
   * yield_vaults::claim_yield_from_yt(account, yt_token_id, registry_addr)
   */
  const claimYieldFromYT = (ytTokenId: number) =>
    exec(() =>
      sendTransaction(buildTxPayload(ADDR, MOD, 'claim_yield_from_yt', [], [
        ytTokenId.toString(),
        ADDR,
      ])),
    );

  /**
   * yield_vaults::restake_eigenlayer(account, vault_id, asset, amount_usdc, registry_addr)
   */
  const restakeEigenLayer = (vaultId: number, asset: string, amountUsdc: number) =>
    exec(() =>
      sendTransaction(buildTxPayload(ADDR, MOD, 'restake_eigenlayer', [], [
        vaultId.toString(),
        asset,
        Math.floor(amountUsdc * 1_000_000).toString(),
        ADDR,
      ])),
    );

  /**
   * yield_vaults::restake_symbiotic(account, vault_id, asset, amount_usdc, registry_addr)
   */
  const restakeSymbiotic = (vaultId: number, asset: string, amountUsdc: number) =>
    exec(() =>
      sendTransaction(buildTxPayload(ADDR, MOD, 'restake_symbiotic', [], [
        vaultId.toString(),
        asset,
        Math.floor(amountUsdc * 1_000_000).toString(),
        ADDR,
      ])),
    );

  /**
   * yield_vaults::submit_encrypted_intent(account, intent_type, encrypted_payload, nonce, processor_addr)
   * intent_type: 1=deposit, 2=withdraw, 3=restake
   */
  const submitEncryptedIntent = (intentType: number, encryptedPayload: number[], nonce: number) =>
    exec(() =>
      sendTransaction(buildTxPayload(ADDR, MOD, 'submit_encrypted_intent', [], [
        intentType.toString(),
        encryptedPayload,
        nonce.toString(),
        ADDR, // processor_addr
      ])),
    );

  // View: yield_vaults::get_vault_details(vault_id, registry_addr)
  // Returns (name, vault_type, total_assets, total_yield, fee_accumulated)
  const getVaultDetails = (vaultId: number) =>
    viewFunction<[string, number, string, string, string]>(
      ADDR, MOD, 'get_vault_details', [], [vaultId.toString(), ADDR],
    );

  return {
    depositAndSplit, claimYieldFromYT,
    restakeEigenLayer, restakeSymbiotic,
    submitEncryptedIntent, getVaultDetails,
    loading, error,
  };
}
