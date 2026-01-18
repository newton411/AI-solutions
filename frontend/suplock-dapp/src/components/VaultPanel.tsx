import React, { useState } from 'react';

export const VaultPanel: React.FC = () => {
  const [vaults] = useState([
    { id: 1, name: 'stETH EigenLayer', apy: '8.5%', tvl: '$2.4M', type: 'EigenLayer', status: 'Active' },
    { id: 2, name: 'SUPRA Symbiotic', apy: '12.0%', tvl: '$1.8M', type: 'Symbiotic', status: 'Active' },
    { id: 3, name: 'Hybrid Restaking', apy: '9.8%', tvl: '$3.1M', type: 'Hybrid', status: 'Active' },
  ]);

  const [selectedVault, setSelectedVault] = useState<number | null>(null);
  const [depositAmount, setDepositAmount] = useState('');

  const handleDeposit = () => {
    if (depositAmount && selectedVault) {
      console.log(`Depositing ${depositAmount} USDC into vault ${selectedVault}`);
      setDepositAmount('');
    }
  };

  return (
    <div className="bg-darkGray border border-gold rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gold mb-6">Yield & Restaking Vaults</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {vaults.map((vault) => (
          <div
            key={vault.id}
            onClick={() => setSelectedVault(vault.id)}
            className={`p-4 rounded-lg cursor-pointer transition border-2 ${
              selectedVault === vault.id
                ? 'border-gold bg-dark'
                : 'border-gold/30 bg-dark hover:border-gold'
            }`}
          >
            <h3 className="text-white font-bold mb-2">{vault.name}</h3>
            <div className="space-y-1 text-sm text-gray-300">
              <div>APY: <span className="text-gold font-semibold">{vault.apy}</span></div>
              <div>TVL: <span className="text-gold font-semibold">{vault.tvl}</span></div>
              <div>Type: <span className="text-gold font-semibold">{vault.type}</span></div>
            </div>
            <div className="mt-2">
              <span className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded">
                {vault.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedVault && (
        <div className="bg-dark border border-gold rounded-lg p-4">
          <h3 className="text-gold font-bold mb-4">Deposit into Vault</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Amount (USDC)
              </label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="1000"
                className="w-full px-4 py-2 bg-darkGray border border-gold rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDeposit}
                disabled={!depositAmount}
                className="flex-1 py-2 bg-gold hover:bg-darkGold text-dark font-bold rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Deposit & Split PT/YT
              </button>
              <button
                onClick={() => setSelectedVault(null)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
