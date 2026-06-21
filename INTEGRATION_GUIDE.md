# SUPLOCK — Complete Integration Guide

> Written for someone with no coding background. Every step is explained in plain English.

---

## What This Project Is

SUPLOCK is a DeFi app with 3 layers:

```
Browser (Website)  ──►  Backend (API Server)  ──►  Blockchain (Smart Contracts)
frontend/             backend/                    smart-contracts/
suplock-dapp/         suplock-api/                supra/suplock/sources/
```

| Layer | Technology | What it does |
|---|---|---|
| Frontend | React / Next.js | The website users see and click |
| Backend | Node.js / Express | Calculates yields, serves proposals, floor status |
| Smart Contracts | Move (Supra L1) | Holds real money, locks tokens, governs protocol |

---

## Folder Structure (What Each File Does)

```
AI-solutions/
├── frontend/suplock-dapp/
│   └── src/
│       ├── config/
│       │   └── contracts.ts          ← CONTRACT ADDRESSES — update after deploy
│       ├── lib/
│       │   └── api.ts                ← Talks to the backend over HTTP
│       ├── contexts/
│       │   └── WalletContext.tsx     ← Manages StarKey wallet connection
│       ├── components/
│       │   ├── LockUI.tsx            ← Lock tab: calls create_lock on-chain
│       │   ├── GovernancePanel.tsx   ← Governance tab: fetches proposals from backend
│       │   ├── VaultPanel.tsx        ← Vaults tab: deposit/withdraw on-chain
│       │   ├── DividendPanel.tsx     ← Dividends tab: claim_dividends on-chain
│       │   └── WalletConnectButton.tsx ← Connect/disconnect button
│       └── pages/
│           └── index.tsx             ← Main page, 5-tab layout
│
├── backend/suplock-api/
│   └── src/
│       ├── index.ts                  ← 9 REST API endpoints
│       ├── governance.ts             ← Proposal data
│       └── projections.ts            ← Supply decay forecasting
│
└── smart-contracts/supra/suplock/
    └── sources/
        ├── suplock_core.move         ← Lock/unlock SUPRA tokens
        ├── vesupra.move              ← Governance DAO + voting
        ├── supreserve.move           ← Fee distribution flywheel
        └── yield_vaults.move         ← PT/YT vaults + restaking
```

---

## How Everything Connects (The Flow)

### When a user clicks "Lock SUPRA":
```
1. User types amount + duration on the website (LockUI.tsx)
2. LockUI calls api.estimateYield() → backend calculates yield estimate
3. User clicks submit → LockUI calls wallet.sendTransaction()
4. WalletContext sends the transaction to StarKey wallet (browser extension)
5. StarKey asks user to approve on the Supra blockchain
6. Smart contract suplock_core::create_lock() runs on Supra L1
7. Transaction hash shown to user with SupraScan link
```

### When a user opens the Governance tab:
```
1. GovernancePanel loads → calls api.proposals() and api.governanceStats()
2. Backend returns live proposal data (currently mock data — see "What's Missing")
3. User clicks "Vote For" → wallet.sendTransaction() → vesupra::cast_vote() on-chain
```

### When a user opens the Dividends tab:
```
1. DividendPanel loads → calls api.floorStatus()
2. Backend returns circulating supply, floor mode, fee split percentages
3. User clicks "Claim Dividends" → supreserve::claim_dividends() on-chain
```

---

## Step-by-Step Setup

### Prerequisites (Install These First)

1. **Node.js 18+** — https://nodejs.org (download LTS version)
2. **Git** — https://git-scm.com
3. **StarKey Wallet** (browser extension) — https://starkey.me
   - This is the Supra L1 wallet users need to interact with the dApp
4. **Supra CLI** (for deploying smart contracts) — https://docs.supra.com/move/getting-started

---

### Step 1 — Clone the Repository

Open Terminal (Mac/Linux) or Command Prompt (Windows):

```bash
git clone https://github.com/Thabiiey411beta/AI-solutions.git
cd AI-solutions
```

---

### Step 2 — Start the Backend

```bash
cd backend/suplock-api
npm install
cp .env.example .env
npm run dev
```

You should see:
```
SUPLOCK API running on http://localhost:3001
```

Test it works — open your browser and go to:
- http://localhost:3001/health  → should show `{"status":"healthy"}`
- http://localhost:3001/api/stats → should show protocol statistics
- http://localhost:3001/api/proposals → should show governance proposals

---

### Step 3 — Start the Frontend

Open a **new** Terminal window (keep the backend running):

```bash
cd frontend/suplock-dapp
npm install
cp .env.example .env.local
npm run dev
```

You should see:
```
▲ Next.js ready on http://localhost:3000
```

Open http://localhost:3000 in your browser — you should see the SUPLOCK website.

---

### Step 4 — Connect StarKey Wallet

1. Install the StarKey browser extension from https://starkey.me
2. Create a new wallet (save your seed phrase!)
3. Switch StarKey to **Supra Testnet** (Chain ID: 6)
4. Get testnet SUPRA from the faucet: https://faucet.supra.com
5. Click "Connect Wallet" on the website — StarKey will ask for permission

---

### Step 5 — Deploy Smart Contracts (Required for Live Transactions)

> **Important:** Until contracts are deployed, the Lock/Vault/Dividend buttons will fail because there's nothing at the contract address. Governance and stats still work (they use the backend).

Install Supra CLI, then:

```bash
cd smart-contracts/supra/suplock

# Edit Move.toml — replace "0x0" with your wallet address
# [addresses]
# suplock = "0xYOUR_WALLET_ADDRESS"

# Compile contracts
supra move compile

# Run tests
supra move test

# Deploy to testnet
supra move publish --network testnet
```

After deploying, Supra will give you a **contract address** (looks like `0xabc123...`).

---

### Step 6 — Update Contract Addresses

Open `frontend/suplock-dapp/src/config/contracts.ts` and replace the placeholder addresses:

```typescript
export const CONTRACT_ADDRESSES = {
  SUPLOCK:      '0xYOUR_DEPLOYED_ADDRESS',
  CORE:         '0xYOUR_DEPLOYED_ADDRESS',
  VESUPRA:      '0xYOUR_DEPLOYED_ADDRESS',
  PRESERVE:     '0xYOUR_DEPLOYED_ADDRESS',
  YIELD_VAULTS: '0xYOUR_DEPLOYED_ADDRESS',
};
```

All contracts in this project deploy from the same address (the publisher's address), so they all share the same address — the module name (e.g. `suplock_core`, `vesupra`) differentiates them.

---

## Backend API Endpoints Reference

| Method | URL | What it returns |
|---|---|---|
| GET | /health | Server health check |
| GET | /api/stats | Protocol statistics (TVL, supply, etc.) |
| GET | /api/floor-status | Current burn mode + fee distribution % |
| GET | /api/proposals | All governance proposals |
| GET | /api/governance/stats | Voter counts, turnout |
| GET | /api/projections?months=24 | 24-month supply decay forecast |
| GET | /api/privacy/mev-captured | MEV protection statistics |
| POST | /api/estimate-yield | Calculate yield for lock amount/duration |
| POST | /api/calculate-dividends | Calculate user's dividend share |

---

## Smart Contract Functions Reference

These are the Move functions the frontend calls:

| Contract | Function | Called From | What it Does |
|---|---|---|---|
| suplock_core | `create_lock` | LockUI | Locks SUPRA tokens |
| suplock_core | `early_unlock` | LockUI (planned) | Unlocks early with penalty |
| suplock_core | `claim_yield` | LockUI (planned) | Claims earned yield |
| vesupra | `cast_vote` | GovernancePanel | Votes on a proposal |
| vesupra | `create_proposal` | GovernancePanel | Creates a new proposal |
| supreserve | `claim_dividends` | DividendPanel | Claims USDC dividends |
| yield_vaults | `deposit` | VaultPanel | Deposits into SUPRA vault |
| yield_vaults | `withdraw` | VaultPanel | Withdraws from vault |

---

## What's Missing / Not Yet Built

These features are **UI-only or not connected** — they need additional work:

### 1. On-chain Proposal Reading
- **Current state:** Proposals come from `backend/governance.ts` (hardcoded mock data)
- **What's needed:** Backend needs to query the Supra blockchain using RPC to fetch real on-chain proposals from the `vesupra` contract
- **File to update:** `backend/suplock-api/src/governance.ts`

### 2. Real Dividend Balances
- **Current state:** The claimable amount (`$245.67`) is hardcoded in `DividendPanel.tsx`
- **What's needed:** A backend endpoint that queries `supreserve::get_claimable(address)` on-chain per user
- **File to update:** `backend/suplock-api/src/index.ts` + `DividendPanel.tsx`

### 3. Real TVL / Stats
- **Current state:** `api/stats` returns hardcoded numbers
- **What's needed:** Backend queries on-chain `GlobalLockState` resource to read real totals
- **File to update:** `backend/suplock-api/src/index.ts`

### 4. Early Unlock Button
- **Current state:** `suplock_core::early_unlock` exists in the contract but has no UI
- **What's needed:** Add a "My Locks" section in the Lock tab showing active positions with an unlock button

### 5. Bridge Contract
- **Current state:** Bridge contract (`bridge_tests.move`) exists in tests but not in `sources/`
- **What's needed:** Create `bridge.move` in `smart-contracts/supra/suplock/sources/` and deploy it

### 6. NFT Contract
- **Current state:** Genesis NFT tests exist but no `genesis_nft.move` source file
- **What's needed:** Create `genesis_nft.move` in sources and add a Mint page to the frontend

### 7. Swap Contract
- **Current state:** Referenced in the integration guide but no Move source exists
- **What's needed:** `suplock_swap.move` source file

### 8. Wallet Balance Refresh
- **Current state:** Balance fetches on connect and after transactions
- **What's needed:** Auto-refresh every 30 seconds while connected

### 9. Backend Blockchain Queries
- **Current state:** Backend uses no blockchain data
- **What's needed:** Install `supra-l1-sdk` in the backend and use it to read on-chain state

---

## Deployment to Production

### Backend (choose one)
- **Railway:** https://railway.app — connect GitHub, deploy `backend/suplock-api`
- **Render:** https://render.com — free tier available
- **Vercel:** Already configured via `backend/suplock-api/vercel.json`

Set environment variable: `SUPRA_RPC_URL=https://rpc-testnet.supra.com`

### Frontend (Vercel — already configured)
```bash
# Install Vercel CLI
npm install -g vercel

cd frontend/suplock-dapp
vercel --prod
```

Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_API_URL` = your deployed backend URL
- `NEXT_PUBLIC_RPC_URL` = `https://rpc-testnet.supra.com`
- `NEXT_PUBLIC_CHAIN_ID` = `6`

---

## Common Errors and Fixes

| Error | Cause | Fix |
|---|---|---|
| "StarKey wallet not found" | Extension not installed | Install from starkey.me |
| "Transaction failed" | Contract not deployed | Deploy contracts (Step 5) |
| "Failed to load governance data" | Backend not running | Run `npm run dev` in backend folder |
| "API error 404" | Wrong API URL | Check `NEXT_PUBLIC_API_URL` in `.env.local` |
| "CORS error" | Backend blocking frontend | Check CORS origins in `backend/src/index.ts` |
| Amount shows wrong decimals | Quants conversion | 1 SUPRA = 100,000,000 Quants (8 decimals) |

---

## Quick Commands Reference

```bash
# Start backend
cd backend/suplock-api && npm run dev

# Start frontend
cd frontend/suplock-dapp && npm run dev

# Deploy contracts
cd smart-contracts/supra/suplock && supra move publish --network testnet

# Build frontend for production
cd frontend/suplock-dapp && npm run build
```

---

## Summary: What Was Connected in This Integration

| Before | After |
|---|---|
| Wallet used mock random address | Real StarKey wallet on Supra Testnet |
| Lock button printed to console | Calls `suplock_core::create_lock` on-chain |
| Governance loaded hardcoded data | Fetches from backend `/api/proposals` |
| Vote buttons logged to console | Calls `vesupra::cast_vote` on-chain |
| Dividends showed fake numbers | Fetches floor status from `/api/floor-status` |
| Claim button had a fake delay | Calls `supreserve::claim_dividends` on-chain |
| Vault deposit did nothing | Calls `yield_vaults::deposit` on-chain |
| No yield estimate shown | Calls backend `/api/estimate-yield` live |
| No transaction links | Every TX links to SupraScan explorer |
