import { useState, useCallback } from 'react';
import { buildTxPayload, viewFunction } from '@/lib/supraClient';
import { PACKAGE_ADDRESS, MODULES } from '@/config/contracts';
import { useWalletContext } from '@/context/WalletContext';

const ADDR = PACKAGE_ADDRESS;
const MOD  = MODULES.SUPRESERVE;

export function useDividends() {
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
   * supreserve::claim_dividends(account, ve_balance, reserve_addr)
   * ve_balance: user's veSUPRA balance as u128 string
   */
  const claimDividends = (veBalance: string) =>
    exec(() =>
      sendTransaction(buildTxPayload(ADDR, MOD, 'claim_dividends', [], [
        veBalance,
        ADDR, // reserve_addr
      ])),
    );

  /**
   * supreserve::initialize_dividend_tracker(account)
   * Call once per user before first claim
   */
  const initDividendTracker = () =>
    exec(() =>
      sendTransaction(buildTxPayload(ADDR, MOD, 'initialize_dividend_tracker', [], [])),
    );

  // View: supreserve::get_accumulated_fees(reserve_addr)
  const getAccumulatedFees = () =>
    viewFunction<string>(ADDR, MOD, 'get_accumulated_fees', [], [ADDR]);

  // View: supreserve::get_total_burned(reserve_addr)
  const getTotalBurned = () =>
    viewFunction<string>(ADDR, MOD, 'get_total_burned', [], [ADDR]);

  // View: supreserve::get_treasury_balance(reserve_addr)
  const getTreasuryBalance = () =>
    viewFunction<string>(ADDR, MOD, 'get_treasury_balance', [], [ADDR]);

  // View: supreserve::get_total_dividends_paid(reserve_addr)
  const getTotalDividendsPaid = () =>
    viewFunction<string>(ADDR, MOD, 'get_total_dividends_paid', [], [ADDR]);

  return {
    claimDividends, initDividendTracker,
    getAccumulatedFees, getTotalBurned, getTreasuryBalance, getTotalDividendsPaid,
    loading, error,
  };
}
