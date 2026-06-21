import { RPC_URL, CHAIN_ID } from '@/config/contracts';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TxPayload {
  function: string;          // "{address}::{module}::{function}"
  type_arguments: string[];
  arguments: (string | number | boolean)[];
}

// ── View functions (read-only REST calls) ─────────────────────────────────────

export async function viewFunction<T = unknown>(
  moduleAddress: string,
  moduleName: string,
  functionName: string,
  typeArgs: string[] = [],
  args: (string | number | boolean)[] = [],
): Promise<T> {
  const res = await fetch(`${RPC_URL}/rpc/v1/view`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      function:       `${moduleAddress}::${moduleName}::${functionName}`,
      type_arguments: typeArgs,
      arguments:      args,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`View function error: ${text}`);
  }
  return res.json() as Promise<T>;
}

/** Get all account resources (used to read on-chain state structs) */
export async function getAccountResources(address: string) {
  const res = await fetch(`${RPC_URL}/rpc/v1/accounts/${address}/resources`);
  if (!res.ok) throw new Error('Failed to fetch account resources');
  return res.json();
}

/** Get SUPRA balance for an address */
export async function getSupraBalance(address: string): Promise<number> {
  try {
    const res = await fetch(
      `${RPC_URL}/rpc/v1/accounts/${address}/resources/0x1::coin::CoinStore%3C0x1::supra_coin::SupraCoin%3E`,
    );
    if (!res.ok) return 0;
    const data = await res.json();
    return Number(data?.data?.coin?.value ?? 0) / 1e8;
  } catch {
    return 0;
  }
}

/** Fetch account sequence number (required before building raw transactions) */
export async function getSequenceNumber(address: string): Promise<number> {
  const res = await fetch(`${RPC_URL}/rpc/v1/accounts/${address}`);
  if (!res.ok) throw new Error('Failed to fetch account info');
  const data = await res.json();
  return Number(data?.sequence_number ?? 0);
}

// ── StarKey Wallet ─────────────────────────────────────────────────────────────

declare global {
  interface Window {
    starkey?: {
      supra: {
        connect:    () => Promise<string[]>;
        disconnect: () => Promise<void>;
        account:    () => Promise<string>;
        getChainId: () => Promise<{ chainId: number }>;
        signAndSendTransaction: (payload: {
          data: TxPayload;
          from: string;
        }) => Promise<{ hash: string }>;
        on:  (event: string, cb: (...args: unknown[]) => void) => void;
        off: (event: string, cb: (...args: unknown[]) => void) => void;
      };
    };
  }
}

export function getStarKey() {
  if (typeof window === 'undefined') return null;
  return window.starkey?.supra ?? null;
}

export async function connectStarKey(): Promise<string> {
  const sk = getStarKey();
  if (!sk) throw new Error('StarKey wallet not installed. Visit https://starkey.app');
  const accounts = await sk.connect();
  if (!accounts.length) throw new Error('No accounts returned from StarKey');
  return accounts[0];
}

/** Sign and send a transaction via StarKey, returns tx hash */
export async function submitTx(payload: TxPayload, fromAddress: string): Promise<string> {
  const sk = getStarKey();
  if (!sk) throw new Error('StarKey wallet not connected');
  const result = await sk.signAndSendTransaction({ data: payload, from: fromAddress });
  return result.hash;
}

/** Poll RPC until tx is confirmed or timeout (ms) */
export async function waitForTx(txHash: string, timeoutMs = 60_000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await new Promise(r => setTimeout(r, 2000));
    try {
      const res  = await fetch(`${RPC_URL}/rpc/v1/transactions/by_hash/${txHash}`);
      const data = await res.json();
      if (data?.success === true)  return;
      if (data?.success === false) throw new Error(data?.vm_status ?? 'Transaction failed');
    } catch (e: any) {
      if (!e.message?.includes('not found')) throw e;
    }
  }
  throw new Error('Transaction confirmation timeout');
}

/** Build a TxPayload — convenience wrapper */
export function buildTxPayload(
  moduleAddress: string,
  moduleName: string,
  functionName: string,
  typeArgs: string[] = [],
  args: (string | number | boolean)[] = [],
): TxPayload {
  return {
    function:       `${moduleAddress}::${moduleName}::${functionName}`,
    type_arguments: typeArgs,
    arguments:      args,
  };
}
