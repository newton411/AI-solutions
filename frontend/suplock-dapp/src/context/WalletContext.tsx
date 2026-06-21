'use client';
import React, { createContext, useContext } from 'react';
import { useWallet } from '@/hooks/useWallet';
import type { WalletState } from '@/hooks/useWallet';
import type { TxPayload } from '@/lib/supraClient';

interface WalletContextValue extends WalletState {
  connect:        () => Promise<void>;
  disconnect:     () => Promise<void>;
  sendTransaction:(payload: TxPayload) => Promise<string>;
  refreshBalance: (addr: string) => Promise<void>;
}

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const wallet = useWallet();
  return <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>;
}

export function useWalletContext(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWalletContext must be used inside <WalletProvider>');
  return ctx;
}
