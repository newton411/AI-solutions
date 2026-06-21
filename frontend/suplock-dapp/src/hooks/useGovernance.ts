import { useState, useCallback } from 'react';
import { buildTxPayload, viewFunction } from '@/lib/supraClient';
import { PACKAGE_ADDRESS, MODULES } from '@/config/contracts';
import { useWalletContext } from '@/context/WalletContext';

const ADDR = PACKAGE_ADDRESS;
const MOD  = MODULES.VESUPRA;

export function useGovernance() {
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
   * vesupra::mint_ve_nft(account, supra_amount, lock_duration_secs, registry_addr)
   */
  const mintVeNFT = (amountQuants: string, lockDurationSecs: number) =>
    exec(() =>
      sendTransaction(buildTxPayload(ADDR, MOD, 'mint_ve_nft', [], [
        amountQuants,
        lockDurationSecs.toString(),
        ADDR, // registry_addr
      ])),
    );

  /**
   * vesupra::create_proposal(account, title, description, proposal_type, dao_addr, registry_addr)
   * proposal_type: 1=revenue_split, 2=vault_fees, 3=locking_tiers, 4=treasury_use
   */
  const createProposal = (title: string, description: string, proposalType: number) =>
    exec(() =>
      sendTransaction(buildTxPayload(ADDR, MOD, 'create_proposal', [], [
        title,
        description,
        proposalType.toString(),
        ADDR, // dao_addr
        ADDR, // registry_addr
      ])),
    );

  /**
   * vesupra::cast_vote(account, proposal_id, voted_for, dao_addr, registry_addr)
   */
  const castVote = (proposalId: number, votedFor: boolean) =>
    exec(() =>
      sendTransaction(buildTxPayload(ADDR, MOD, 'cast_vote', [], [
        proposalId.toString(),
        votedFor,
        ADDR, // dao_addr
        ADDR, // registry_addr
      ])),
    );

  /**
   * vesupra::execute_proposal(account, proposal_id, dao_addr)
   */
  const executeProposal = (proposalId: number) =>
    exec(() =>
      sendTransaction(buildTxPayload(ADDR, MOD, 'execute_proposal', [], [
        proposalId.toString(),
        ADDR, // dao_addr
      ])),
    );

  /**
   * vesupra::burn_ve_nft(account, token_id, registry_addr)
   */
  const burnVeNFT = (tokenId: number) =>
    exec(() =>
      sendTransaction(buildTxPayload(ADDR, MOD, 'burn_ve_nft', [], [
        tokenId.toString(),
        ADDR, // registry_addr
      ])),
    );

  // View: vesupra::get_ve_balance(user, registry_addr)
  const getVeBalance = (userAddress: string) =>
    viewFunction<string>(ADDR, MOD, 'get_ve_balance', [], [userAddress, ADDR]);

  // View: vesupra::get_ve_total_supply(registry_addr)
  const getVeTotalSupply = () =>
    viewFunction<string>(ADDR, MOD, 'get_ve_total_supply', [], [ADDR]);

  return {
    mintVeNFT, createProposal, castVote, executeProposal, burnVeNFT,
    getVeBalance, getVeTotalSupply,
    loading, error,
  };
}
