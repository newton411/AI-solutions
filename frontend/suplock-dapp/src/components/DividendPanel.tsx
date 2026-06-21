import React, { useState, useEffect, useContext } from 'react';
import { WalletContext } from '@/contexts/WalletContext';
import { CONTRACT_ADDRESSES, EXPLORER } from '@/config/contracts';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

export const DividendPanel: React.FC = () => {
  const wallet  = useContext(WalletContext);
  const [floor,   setFloor]   = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [claimable, setClaimable] = useState(245.67); // will be replaced by on-chain query
  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    api.floorStatus()
      .then(setFloor)
      .catch(() => toast.error('Failed to load floor status'))
      .finally(() => setLoading(false));
  }, []);

  const handleClaim = async () => {
    if (!wallet?.isConnected) { toast.error('Connect your wallet first'); return; }
    setClaiming(true);
    try {
      const hash = await wallet.sendTransaction({
        function: `${CONTRACT_ADDRESSES.PRESERVE}::supreserve::claim_dividends`,
        typeArguments: [],
        functionArguments: [],
      });
      setTxHash(hash);
      setClaimable(0);
      toast.success('Dividends claimed!');
    } catch (err: any) {
      toast.error(err.message || 'Claim failed');
    } finally {
      setClaiming(false);
    }
  };

  const dist = floor?.distribution;

  return (
    <div className="space-y-6">
      {/* Your Dividends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-darkGray border border-gold/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gold mb-4">💰 Your Dividends</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Claimable:</span>
              <span className="text-2xl font-bold text-gold">${claimable.toFixed(2)} USDC</span>
            </div>
            {wallet?.address && (
              <div className="flex justify-between">
                <span className="text-gray-400">Wallet:</span>
                <span className="text-gold font-mono text-sm">
                  {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleClaim}
            disabled={claiming || claimable === 0 || !wallet?.isConnected}
            className="w-full mt-4 py-3 bg-gold hover:bg-darkGold text-dark font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {claiming ? 'Claiming...' : claimable > 0 ? 'Claim Dividends' : 'No Dividends Available'}
          </button>

          {!wallet?.isConnected && (
            <p className="text-yellow-500 text-xs mt-2 text-center">Connect wallet to claim</p>
          )}

          {txHash && (
            <div className="mt-3 p-2 bg-green-900/30 border border-green-600 rounded text-xs">
              <a href={`${EXPLORER}/tx/${txHash}`} target="_blank" rel="noreferrer"
                className="text-green-400 hover:underline font-mono">
                TX: {txHash.slice(0, 12)}...{txHash.slice(-8)}
              </a>
            </div>
          )}
        </div>

        {/* Protocol Stats from backend */}
        <div className="bg-darkGray border border-gold/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gold mb-4">📊 Protocol Stats</h3>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : floor ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Circulating Supply:</span>
                <span className="text-gold">{(floor.circulatingSupply / 1e9).toFixed(1)}B SUPRA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Floor Target:</span>
                <span className="text-gold">{(floor.floorThreshold / 1e9).toFixed(0)}B SUPRA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Mode:</span>
                <span className={`font-bold ${floor.isPostFloor ? 'text-blue-400' : 'text-red-400'}`}>
                  {floor.isPostFloor ? 'Post-Floor' : 'Pre-Floor'}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Fee Distribution */}
      <div className="bg-darkGray border border-gold/30 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-gold mb-4">🏦 SUPReserve Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pre-Floor */}
          <div className={`bg-dark rounded-lg p-4 border ${!floor?.isPostFloor ? 'border-gold' : 'border-gold/20 opacity-60'}`}>
            <h4 className="text-lg font-bold text-gold mb-3">
              🔥 Pre-Floor Mode {!floor?.isPostFloor && <span className="text-xs text-green-400 ml-2">ACTIVE</span>}
            </h4>
            {[
              { label: 'Buyback & Burn', val: '50%', color: 'text-red-400'  },
              { label: 'USDC Dividends', val: '35%', color: 'text-gold'     },
              { label: 'veSUPRA Rewards',val: '10%', color: 'text-blue-400' },
              { label: 'Treasury/POL',   val: '5%',  color: 'text-green-400'},
            ].map(r => (
              <div key={r.label} className="flex justify-between text-sm py-1">
                <span className="text-gray-400">{r.label}:</span>
                <span className={`font-bold ${r.color}`}>{r.val}</span>
              </div>
            ))}
          </div>

          {/* Post-Floor */}
          <div className={`bg-dark rounded-lg p-4 border ${floor?.isPostFloor ? 'border-gold' : 'border-gray-600 opacity-60'}`}>
            <h4 className="text-lg font-bold text-gold mb-3">
              🎯 Post-Floor Mode {floor?.isPostFloor && <span className="text-xs text-green-400 ml-2">ACTIVE</span>}
            </h4>
            {[
              { label: 'Buyback & Burn',  val: '0%',    color: 'text-gray-500' },
              { label: 'USDC Dividends',  val: '65%',   color: 'text-gold'     },
              { label: 'veSUPRA Rewards', val: '12.5%', color: 'text-blue-400' },
              { label: 'Treasury/POL',    val: '12.5%', color: 'text-green-400'},
            ].map(r => (
              <div key={r.label} className="flex justify-between text-sm py-1">
                <span className="text-gray-400">{r.label}:</span>
                <span className={`font-bold ${r.color}`}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floor Progress */}
        {floor && (
          <div className="mt-6 bg-dark rounded-lg p-4 border border-gold/30">
            <h4 className="text-lg font-bold text-gold mb-2">📈 Floor Progress</h4>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Current: {(floor.circulatingSupply / 1e9).toFixed(1)}B SUPRA</span>
              <span className="text-gray-400">Target: {(floor.floorThreshold / 1e9).toFixed(0)}B SUPRA</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-red-500 to-gold h-3 rounded-full transition-all"
                style={{ width: `${Math.min(100, 100 - parseFloat(floor.percentToFloor) + 100)}%` }}
              />
            </div>
            <div className="text-center text-sm text-gray-400 mt-2">
              {floor.percentToFloor}% of floor target reached
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
