import React, { useState, useEffect, useContext } from 'react';
import { WalletContext } from '@/contexts/WalletContext';
import { CONTRACT_ADDRESSES, EXPLORER } from '@/config/contracts';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

interface Proposal {
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
}

interface GovStats {
  totalProposals: number;
  activeProposals: number;
  passedProposals: number;
  totalVeSupply: number;
  uniqueVoters: number;
  averageTurnout: string;
}

export const GovernancePanel: React.FC = () => {
  const wallet = useContext(WalletContext);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [stats, setStats]         = useState<GovStats | null>(null);
  const [loading, setLoading]     = useState(true);
  const [voting, setVoting]       = useState<number | null>(null);
  const [newProposal, setNewProposal]   = useState({ title: '', description: '' });
  const [showCreateForm, setShowForm]   = useState(false);
  const [submitting, setSubmitting]     = useState(false);

  useEffect(() => {
    Promise.all([api.proposals(), api.governanceStats()])
      .then(([p, s]) => { setProposals(p); setStats(s); })
      .catch(err => toast.error('Failed to load governance data'))
      .finally(() => setLoading(false));
  }, []);

  const handleVote = async (proposalId: number, support: boolean) => {
    if (!wallet?.isConnected) { toast.error('Connect your wallet first'); return; }
    setVoting(proposalId);
    try {
      const hash = await wallet.sendTransaction({
        function: `${CONTRACT_ADDRESSES.VESUPRA}::vesupra::cast_vote`,
        typeArguments: [],
        functionArguments: [proposalId, support],
      });
      toast.success(`Vote submitted! TX: ${hash.slice(0, 10)}...`);
      // Refresh proposals from backend
      const updated = await api.proposals();
      setProposals(updated);
    } catch (err: any) {
      toast.error(err.message || 'Vote failed');
    } finally {
      setVoting(null);
    }
  };

  const handleCreateProposal = async () => {
    if (!wallet?.isConnected) { toast.error('Connect your wallet first'); return; }
    if (!newProposal.title || !newProposal.description) { toast.error('Fill in all fields'); return; }
    setSubmitting(true);
    try {
      const hash = await wallet.sendTransaction({
        function: `${CONTRACT_ADDRESSES.VESUPRA}::vesupra::create_proposal`,
        typeArguments: [],
        functionArguments: [newProposal.title, newProposal.description],
      });
      toast.success(`Proposal created! TX: ${hash.slice(0, 10)}...`);
      setNewProposal({ title: '', description: '' });
      setShowForm(false);
      const updated = await api.proposals();
      setProposals(updated);
    } catch (err: any) {
      toast.error(err.message || 'Proposal creation failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gold py-12">Loading governance data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Proposals', value: stats?.totalProposals ?? '—' },
          { label: 'Active Votes',    value: stats?.activeProposals ?? '—' },
          { label: 'veSUPRA Holders', value: stats?.uniqueVoters?.toLocaleString() ?? '—' },
        ].map(s => (
          <div key={s.label} className="bg-darkGray border border-gold/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gold">{s.value}</div>
            <div className="text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Create Proposal */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowForm(!showCreateForm)}
          className="px-6 py-3 bg-gold hover:bg-darkGold text-dark font-bold rounded-lg transition"
        >
          {showCreateForm ? 'Cancel' : 'Create Proposal'}
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-darkGray border border-gold rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gold mb-4">New Proposal</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={newProposal.title}
              onChange={e => setNewProposal({ ...newProposal, title: e.target.value })}
              className="w-full px-4 py-2 bg-dark border border-gold rounded text-white"
              placeholder="Proposal title"
            />
            <textarea
              value={newProposal.description}
              onChange={e => setNewProposal({ ...newProposal, description: e.target.value })}
              className="w-full px-4 py-2 bg-dark border border-gold rounded text-white h-24"
              placeholder="Detailed description"
            />
            <button
              onClick={handleCreateProposal}
              disabled={submitting || !newProposal.title || !newProposal.description}
              className="px-6 py-2 bg-gold hover:bg-darkGold text-dark font-bold rounded transition disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Proposal'}
            </button>
          </div>
        </div>
      )}

      {/* Proposals List */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gold">Proposals</h3>
        {proposals.map(proposal => {
          const total = proposal.votesFor + proposal.votesAgainst || 1;
          const forPct = (proposal.votesFor / total) * 100;
          return (
            <div key={proposal.id} className="bg-darkGray border border-gold/30 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gold">{proposal.title}</h4>
                  <p className="text-gray-300 mt-2">{proposal.description}</p>
                  <p className="text-gray-500 text-xs mt-1">By {proposal.creator} · ends {proposal.votingEndsAt}</p>
                </div>
                <span className={`px-3 py-1 rounded text-sm font-bold shrink-0 ml-4 ${
                  proposal.status === 'active'   ? 'bg-green-600 text-white' :
                  proposal.status === 'passed'   ? 'bg-blue-600 text-white'  :
                  proposal.status === 'executed' ? 'bg-purple-600 text-white':
                  'bg-red-600 text-white'
                }`}>
                  {proposal.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-400">For: {proposal.votesFor.toLocaleString()}</span>
                  <span className="text-red-400">Against: {proposal.votesAgainst.toLocaleString()}</span>
                </div>
                <div className="w-full bg-dark rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: `${forPct}%` }} />
                </div>
              </div>

              {proposal.status === 'active' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVote(proposal.id, true)}
                    disabled={voting === proposal.id}
                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition disabled:opacity-50"
                  >
                    {voting === proposal.id ? '...' : 'Vote For'}
                  </button>
                  <button
                    onClick={() => handleVote(proposal.id, false)}
                    disabled={voting === proposal.id}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition disabled:opacity-50"
                  >
                    {voting === proposal.id ? '...' : 'Vote Against'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
