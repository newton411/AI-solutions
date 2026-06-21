import React, { useState, useContext, useEffect } from 'react';
import { WalletContext } from '@/contexts/WalletContext';
import { CONTRACT_ADDRESSES, toQuants, EXPLORER } from '@/config/contracts';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

interface LockUIProps {
  onLock: (amount: string, duration: number) => Promise<void>;
  isLoading: boolean;
}

const DURATIONS = [
  { label: '3 Months',  secs: 7_776_000,   months: 3,  boost: 1.0  },
  { label: '6 Months',  secs: 15_552_000,  months: 6,  boost: 1.25 },
  { label: '1 Year',    secs: 31_104_000,  months: 12, boost: 1.75 },
  { label: '2 Years',   secs: 62_208_000,  months: 24, boost: 2.15 },
  { label: '4 Years',   secs: 126_144_000, months: 48, boost: 2.5  },
];

export const LockUI: React.FC<LockUIProps> = ({ onLock, isLoading }) => {
  const wallet = useContext(WalletContext);
  const [amount, setAmount]     = useState('');
  const [durIdx, setDurIdx]     = useState(0);
  const [estYield, setEstYield] = useState<string | null>(null);
  const [txHash, setTxHash]     = useState<string | null>(null);
  const [locking, setLocking]   = useState(false);

  const dur = DURATIONS[durIdx];

  // Fetch backend yield estimate whenever amount/duration changes
  useEffect(() => {
    const num = parseFloat(amount);
    if (!num || num <= 0) { setEstYield(null); return; }
    const controller = new AbortController();
    api.estimateYield(num, dur.months, dur.boost)
      .then(r => setEstYield(r.estimatedYield))
      .catch(() => setEstYield(null));
    return () => controller.abort();
  }, [amount, durIdx]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet?.isConnected) { toast.error('Connect your wallet first'); return; }
    const num = parseFloat(amount);
    if (!num || num <= 0) { toast.error('Enter a valid amount'); return; }

    setLocking(true);
    try {
      // Call suplock_core::create_lock on-chain
      const hash = await wallet.sendTransaction({
        function: `${CONTRACT_ADDRESSES.CORE}::suplock_core::create_lock`,
        typeArguments: [],
        functionArguments: [
          toQuants(num),       // amount in Quants
          dur.secs,            // lock_duration_secs
          CONTRACT_ADDRESSES.CORE, // global_state_addr
        ],
      });
      setTxHash(hash);
      toast.success(`Locked ${amount} SUPRA for ${dur.label}!`);
      setAmount('');
      await onLock(amount, dur.secs); // notify parent
    } catch (err: any) {
      toast.error(err.message || 'Lock failed');
    } finally {
      setLocking(false);
    }
  };

  const busy = isLoading || locking;

  return (
    <div className="bg-darkGray border border-gold rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gold mb-4">Lock $SUPRA</h2>

      {!wallet?.isConnected && (
        <div className="mb-4 p-3 bg-yellow-900/40 border border-yellow-600 rounded text-yellow-400 text-sm">
          Connect your StarKey wallet to lock tokens on-chain.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Amount (SUPRA)</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="1000"
            min="1"
            className="w-full px-4 py-2 bg-dark border border-gold rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold"
            disabled={busy}
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Lock Duration</label>
          <select
            value={durIdx}
            onChange={e => setDurIdx(Number(e.target.value))}
            className="w-full px-4 py-2 bg-dark border border-gold rounded text-white focus:outline-none focus:ring-2 focus:ring-gold"
            disabled={busy}
          >
            {DURATIONS.map((d, i) => (
              <option key={i} value={i}>{d.label} ({d.boost}x)</option>
            ))}
          </select>
        </div>

        <div className="bg-dark rounded p-3 border border-gold/30 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-300">Boost Multiplier:</span>
            <span className="text-gold font-bold">{dur.boost}x</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Est. Annual Yield:</span>
            <span className="text-gold">
              {estYield ? `${parseFloat(estYield).toFixed(2)} SUPRA` : '—'}
            </span>
          </div>
          {wallet?.balance && (
            <div className="flex justify-between">
              <span className="text-gray-300">Wallet Balance:</span>
              <span className="text-gold">{wallet.balance} SUPRA</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={busy || !amount}
          className="w-full py-3 bg-gold hover:bg-darkGold text-dark font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy ? 'Locking...' : 'Lock SUPRA'}
        </button>
      </form>

      {txHash && (
        <div className="mt-4 p-3 bg-green-900/30 border border-green-600 rounded text-sm">
          <span className="text-gray-400">TX: </span>
          <a
            href={`${EXPLORER}/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="text-green-400 font-mono break-all hover:underline"
          >
            {txHash.slice(0, 12)}...{txHash.slice(-8)}
          </a>
        </div>
      )}
    </div>
  );
};
