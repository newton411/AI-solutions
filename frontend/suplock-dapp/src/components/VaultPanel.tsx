import React, { useState, useContext } from 'react';
import { WalletContext } from '@/contexts/WalletContext';
import { CONTRACT_ADDRESSES, toQuants, EXPLORER } from '@/config/contracts';
import toast from 'react-hot-toast';

interface Vault {
  id: string;
  name: string;
  type: string;
  apy: number;
  tvl: string;
  description: string;
  icon: string;
  // Move module function suffix, e.g. "deposit_supra_vault"
  depositFn: string;
  withdrawFn: string;
}

const VAULTS: Vault[] = [
  {
    id: 'supra-vault',
    name: 'SUPRA Vault',
    type: 'SUPRA',
    apy: 12.5,
    tvl: '$2.5M',
    description: 'Core SUPRA staking vault with boosted yields',
    icon: '⚡',
    depositFn:  'deposit',
    withdrawFn: 'withdraw',
  },
  {
    id: 'eigenlayer-steth',
    name: 'EigenLayer stETH',
    type: 'EigenLayer',
    apy: 8.2,
    tvl: '$1.2M',
    description: 'Restake stETH through EigenLayer for additional rewards',
    icon: '🔷',
    depositFn:  'deposit_eigenlayer',
    withdrawFn: 'withdraw_eigenlayer',
  },
  {
    id: 'symbiotic-supra',
    name: 'Symbiotic SUPRA',
    type: 'Symbiotic',
    apy: 15.8,
    tvl: '$800K',
    description: 'Dual restaking with Symbiotic protocol',
    icon: '🔗',
    depositFn:  'deposit_symbiotic',
    withdrawFn: 'withdraw_symbiotic',
  },
];

export const VaultPanel: React.FC = () => {
  const wallet = useContext(WalletContext);
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);
  const [action, setAction]   = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount]   = useState('');
  const [busy, setBusy]       = useState(false);
  const [txHash, setTxHash]   = useState<string | null>(null);

  const handleAction = async () => {
    if (!wallet?.isConnected) { toast.error('Connect your wallet first'); return; }
    if (!selectedVault || !amount) return;
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) { toast.error('Enter a valid amount'); return; }

    setBusy(true);
    setTxHash(null);
    try {
      const fn = action === 'deposit' ? selectedVault.depositFn : selectedVault.withdrawFn;
      const hash = await wallet.sendTransaction({
        function: `${CONTRACT_ADDRESSES.YIELD_VAULTS}::yield_vaults::${fn}`,
        typeArguments: [],
        functionArguments: [toQuants(num)],
      });
      setTxHash(hash);
      toast.success(`${action === 'deposit' ? 'Deposited' : 'Withdrawn'} ${amount} successfully!`);
      setAmount('');
      setSelectedVault(null);
    } catch (err: any) {
      toast.error(err.message || `${action} failed`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total TVL',    value: '$4.5M' },
          { label: 'Avg APY',      value: '12.2%' },
          { label: 'Active Vaults',value: '3'     },
          { label: 'Depositors',   value: '847'   },
        ].map(s => (
          <div key={s.label} className="bg-darkGray border border-gold/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gold">{s.value}</div>
            <div className="text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Vault Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VAULTS.map(vault => (
          <div key={vault.id} className="bg-darkGray border border-gold/30 rounded-lg p-6 hover:border-gold transition">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{vault.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-gold">{vault.name}</h3>
                  <span className="text-sm text-gray-400">{vault.type}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gold">{vault.apy}%</div>
                <div className="text-sm text-gray-400">APY</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">{vault.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">TVL:</span>
              <span className="text-gold font-bold">{vault.tvl}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setSelectedVault(vault); setAction('deposit'); }}
                className="flex-1 py-2 bg-gold hover:bg-darkGold text-dark font-bold rounded transition"
              >
                Deposit
              </button>
              <button
                onClick={() => { setSelectedVault(vault); setAction('withdraw'); }}
                className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded transition"
              >
                Withdraw
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Action Modal */}
      {selectedVault && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-darkGray border border-gold rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gold">
                {action === 'deposit' ? 'Deposit to' : 'Withdraw from'} {selectedVault.name}
              </h3>
              <button onClick={() => setSelectedVault(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full px-4 py-2 bg-dark border border-gold rounded text-white"
                placeholder="Enter amount"
                min="0"
              />
              <div className="bg-dark rounded p-3 border border-gold/30 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current APY:</span>
                  <span className="text-gold">{selectedVault.apy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Est. Annual Yield:</span>
                  <span className="text-gold">
                    {amount ? (parseFloat(amount) * selectedVault.apy / 100).toFixed(2) : '0'} tokens
                  </span>
                </div>
              </div>

              {!wallet?.isConnected && (
                <p className="text-yellow-500 text-sm text-center">Connect wallet to transact</p>
              )}

              {txHash && (
                <div className="p-2 bg-green-900/30 border border-green-600 rounded text-xs">
                  <a href={`${EXPLORER}/tx/${txHash}`} target="_blank" rel="noreferrer"
                    className="text-green-400 hover:underline font-mono">
                    TX: {txHash.slice(0, 12)}...{txHash.slice(-8)}
                  </a>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleAction}
                  disabled={busy || !amount}
                  className="flex-1 py-2 bg-gold hover:bg-darkGold text-dark font-bold rounded transition disabled:opacity-50"
                >
                  {busy ? 'Processing...' : action === 'deposit' ? 'Deposit' : 'Withdraw'}
                </button>
                <button
                  onClick={() => setSelectedVault(null)}
                  className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PT/YT Splitting */}
      <div className="bg-darkGray border border-gold/30 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-gold mb-4">Principal/Yield Token Splitting</h3>
        <p className="text-gray-300 mb-4">
          Split vault positions into Principal Tokens (PT) and Yield Tokens (YT) for advanced strategies.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-dark rounded p-4 border border-gold/30">
            <h4 className="text-lg font-bold text-gold mb-2">🎯 Principal Tokens (PT)</h4>
            <p className="text-gray-300 text-sm">Represents underlying principal. Trades at discount to face value.</p>
          </div>
          <div className="bg-dark rounded p-4 border border-gold/30">
            <h4 className="text-lg font-bold text-gold mb-2">📈 Yield Tokens (YT)</h4>
            <p className="text-gray-300 text-sm">Represents future yield streams. Higher risk, higher potential.</p>
          </div>
        </div>
        <button
          onClick={async () => {
            if (!wallet?.isConnected) { toast.error('Connect wallet first'); return; }
            toast('PT/YT split requires a deposited vault position', { icon: 'ℹ️' });
          }}
          className="px-6 py-2 bg-gold hover:bg-darkGold text-dark font-bold rounded transition"
        >
          Split Position
        </button>
      </div>
    </div>
  );
};
