import React from 'react';
import { useWalletContext } from '@/context/WalletContext';
import { truncateAddress } from '@/config/contracts';

export const WalletConnectButton: React.FC = () => {
  const { address, balance, connected, connecting, error, connect, disconnect } =
    useWalletContext();

  if (connecting) {
    return (
      <button disabled className="px-4 py-2 rounded-lg bg-yellow-600/70 text-white text-sm cursor-not-allowed">
        Connecting...
      </button>
    );
  }

  if (connected && address) {
    return (
      <div className="flex items-center gap-3 bg-darkGray px-4 py-2 rounded-lg border border-gold">
        <div className="flex flex-col">
          <span className="text-gold font-mono text-sm">{truncateAddress(address)}</span>
          <span className="text-gray-400 text-xs">{balance.toFixed(4)} SUPRA</span>
        </div>
        <button
          onClick={disconnect}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={connect}
        className="px-6 py-2 bg-gold hover:bg-darkGold text-dark font-bold rounded-lg transition transform hover:scale-105"
      >
        Connect StarKey
      </button>
      {error && <p className="text-red-400 text-xs mt-1 max-w-xs">{error}</p>}
    </div>
  );
};
