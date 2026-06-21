// All contracts share one package address — each module is distinguished by name
export const PACKAGE_ADDRESS =
  '0xdce3ff2e6370630f906774423d2504d2f278908a5addebd691a7c2d892e1594a';

export const CONTRACT_ADDRESSES = {
  SUPLOCK:      PACKAGE_ADDRESS,
  CORE:         PACKAGE_ADDRESS,
  VESUPRA:      PACKAGE_ADDRESS,
  PRESERVE:     PACKAGE_ADDRESS,
  YIELD_VAULTS: PACKAGE_ADDRESS,
  NFT:          PACKAGE_ADDRESS,
  SWAP:         PACKAGE_ADDRESS,
  RESTAKE:      PACKAGE_ADDRESS,
  BRIDGE:       PACKAGE_ADDRESS,
  AI_AGENT:     PACKAGE_ADDRESS,
} as const;

// Must match module declarations in sources/*.move
export const MODULES = {
  SUPLOCK_CORE: 'suplock_core',
  VESUPRA:      'vesupra',
  SUPRESERVE:   'supreserve',
  YIELD_VAULTS: 'yield_vaults',
} as const;

export const RPC_URL  = process.env.NEXT_PUBLIC_RPC_URL  ?? 'https://rpc-testnet.supra.com';
export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 6);
export const EXPLORER = process.env.NEXT_PUBLIC_EXPLORER_URL ?? 'https://testnet.suprascan.io';

// 1 SUPRA = 100,000,000 Quants (8 decimals)
export const toQuants   = (amount: number): string => Math.floor(amount * 1e8).toString();
export const fromQuants = (q: string | number): number => Number(q) / 1e8;

export const truncateAddress = (addr: string, start = 6, end = 4): string => {
  if (!addr) return '';
  return `${addr.slice(0, start)}...${addr.slice(-end)}`;
};
