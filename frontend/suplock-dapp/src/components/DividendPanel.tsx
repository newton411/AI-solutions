import React, { useState } from 'react';

export const DividendPanel: React.FC = () => {
  const [veSUPRABalance] = useState('5000');
  const [pendingDividends] = useState('234.56');
  const [totalClaimed] = useState('1200.45');
  const [claimHistory] = useState([
    { date: '2026-01-15', amount: '123.45', veSUPRA: '5000' },
    { date: '2025-12-15', amount: '110.45', veSUPRA: '4800' },
    { date: '2025-11-15', amount: '98.34', veSUPRA: '4600' },
  ]);

  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaimDividends = async () => {
    setIsClaiming(true);
    try {
      // Mock claim transaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Dividends claimed:', pendingDividends);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="bg-darkGray border border-gold rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gold mb-6">Monthly Dividends</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-dark border border-gold/30 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-2">veSUPRA Balance</p>
          <p className="text-gold text-2xl font-bold">{veSUPRABalance}</p>
        </div>

        <div className="bg-dark border border-gold/30 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-2">Pending Dividends</p>
          <p className="text-gold text-2xl font-bold">${pendingDividends}</p>
        </div>

        <div className="bg-dark border border-gold/30 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-2">Total Claimed</p>
          <p className="text-gold text-2xl font-bold">${totalClaimed}</p>
        </div>
      </div>

      <button
        onClick={handleClaimDividends}
        disabled={isClaiming || parseFloat(pendingDividends) === 0}
        className="w-full py-3 bg-gold hover:bg-darkGold text-dark font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      >
        {isClaiming ? 'Claiming...' : `Claim ${pendingDividends} USDC`}
      </button>

      <div>
        <h3 className="text-white font-bold mb-4">Claim History</h3>
        <div className="space-y-2">
          {claimHistory.map((claim, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-dark border border-gold/30 rounded">
              <div>
                <p className="text-white text-sm font-medium">{claim.date}</p>
                <p className="text-gray-400 text-xs">veSUPRA: {claim.veSUPRA}</p>
              </div>
              <p className="text-gold font-bold">${claim.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
