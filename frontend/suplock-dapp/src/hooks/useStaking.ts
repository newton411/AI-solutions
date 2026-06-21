import { useState, useCallback } from 'react';
import { buildTxPayload, viewFunction } from '@/lib/supraClient';
import { PACKAGE_ADDRESS, MODULES, toQuants } from '@/config/contracts';
import { useWalletContext } from '@/context/WalletContext';

const ADDR = PACKAGE_ADDRESS;
const MOD  = MODULES.SUPLOCK_CORE;

export function useStaking() {
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
   * suplock_core::create_lock(account, amount, lock_duration_secs, global_state_addr)
   * lock_duration_secs: 7_776_000 (3mo) → 126_144_000 (4yr)
   */
  const createLock = (amountSupra: number, lockDurationSecs: number) =>
    exec(() =>
      sendTransaction(buildTxPayload(ADDR, MOD, 'create_lock', [], [
        toQuants(amountSupra),
        lockDurationSecs.toString(),
        ADDR, // global_state_addr
      ])),
    );

  /**
   * suplock_core::claim_yield(account, lock_index, global_state_addr)
   */
  const claimYield = (lockIndex: number) =>
    exec(() =>
      sendTransaction(buildTxPayload(ADDR, MOD, 'claim_yield', [], [
        lockIndex.toString(),
        ADDR,
      ])),
    );

  /**
   * suplock_core::early_unlock(account, lock_index, global_state_addr)
   */
  const earlyUnlock = (lockIndex: number) =>
    exec(() =>
      sendTransaction(buildTxPayload(ADDR, MOD, 'early_unlock', [], [
        lockIndex.toString(),
        ADDR,
      ])),
    );

  // View: suplock_core::get_user_total_locked(user_addr)
  const getUserTotalLocked = (userAddress: string) =>
    viewFunction<string>(ADDR, MOD, 'get_user_total_locked', [], [userAddress]);

  // View: suplock_core::get_global_stats(global_addr)
  const getGlobalStats = () =>
    viewFunction<[string, string, string]>(ADDR, MOD, 'get_global_stats', [], [ADDR]);

  // View: suplock_core::calculate_boost_multiplier(lock_duration_secs)
  const getBoostMultiplier = (lockDurationSecs: number) =>
    viewFunction<string>(ADDR, MOD, 'calculate_boost_multiplier', [], [lockDurationSecs.toString()]);

  return { createLock, claimYield, earlyUnlock, getUserTotalLocked, getGlobalStats, getBoostMultiplier, loading, error };
}
