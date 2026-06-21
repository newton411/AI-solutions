/**
 * api.ts — Frontend client for the SUPLOCK backend (backend/suplock-api)
 * Base URL is set via NEXT_PUBLIC_API_URL environment variable.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

async function post<T>(path: string, body: object): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

// ── Endpoints matching backend/suplock-api/src/index.ts ──────────────────────

export const api = {
  health: () =>
    get<{ status: string; timestamp: string }>('/health'),

  stats: () =>
    get<{
      totalLocked: string;
      circulatingSupply: string;
      totalBurned: string;
      protocolFees: string;
      activeVaults: number;
      veSUPRAHolders: number;
      governanceProposals: number;
    }>('/api/stats'),

  floorStatus: () =>
    get<{
      circulatingSupply: number;
      floorThreshold: number;
      isPostFloor: boolean;
      percentToFloor: string;
      distribution: Record<string, string>;
    }>('/api/floor-status'),

  proposals: () =>
    get<Array<{
      id: number;
      title: string;
      description: string;
      type: string;
      creator: string;
      createdAt: string;
      votingEndsAt: string;
      votesFor: number;
      votesAgainst: number;
      status: string;
      veSUPRARequired: number;
    }>>('/api/proposals'),

  governanceStats: () =>
    get<{
      totalProposals: number;
      activeProposals: number;
      passedProposals: number;
      totalVeSupply: number;
      uniqueVoters: number;
      averageTurnout: string;
    }>('/api/governance/stats'),

  projections: (months = 24) =>
    get<unknown>(`/api/projections?months=${months}`),

  mevCaptured: () =>
    get<{
      mevCaptured: string;
      mevRouted: string;
      intentsProcessed: number;
    }>('/api/privacy/mev-captured'),

  estimateYield: (amount: number, lockDurationMonths: number, boostMultiplier: number) =>
    post<{
      principalAmount: number;
      lockDurationMonths: number;
      boostMultiplier: number;
      baseAPR: string;
      estimatedYield: string;
      totalValue: string;
    }>('/api/estimate-yield', { amount, lockDurationMonths, boostMultiplier }),

  calculateDividends: (veSUPRABalance: number, totalVeSupply: number, accumulatedFees: number) =>
    post<{
      veSUPRABalance: number;
      accumulatedFees: number;
      dividendPerShare: string;
      userDividends: string;
    }>('/api/calculate-dividends', { veSUPRABalance, totalVeSupply, accumulatedFees }),
};
