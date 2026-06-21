import React from 'react';
import type { AppProps } from 'next/app';
import { WalletProvider } from '@/context/WalletContext';
import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
}

export default App;
