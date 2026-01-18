import React from 'react';

export const GovernancePanel: React.FC = () => {
  const [proposals] = React.useState([
    { id: 1, title: 'Increase buyback allocation to 60%', votes: 8500, status: 'Active' },
    { id: 2, title: 'Add new restaking vault', votes: 7200, status: 'Active' },
    { id: 3, title: 'Adjust locking tier multipliers', votes: 5800, status: 'Voting Ended' },
  ]);

  const [showSubmit, setShowSubmit] = React.useState(false);
  const [proposalTitle, setProposalTitle] = React.useState('');

  const handleSubmitProposal = () => {
    if (proposalTitle.trim()) {
      console.log('Proposal submitted:', proposalTitle);
      setProposalTitle('');
      setShowSubmit(false);
    }
  };

  return (
    <div className="bg-darkGray border border-gold rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gold">Governance</h2>
        <button
          onClick={() => setShowSubmit(!showSubmit)}
          className="px-4 py-2 bg-gold hover:bg-darkGold text-dark font-bold rounded transition"
        >
          {showSubmit ? 'Cancel' : 'Submit Proposal'}
        </button>
      </div>

      {showSubmit && (
        <div className="mb-6 p-4 bg-dark border border-gold rounded">
          <input
            type="text"
            placeholder="Proposal title..."
            value={proposalTitle}
            onChange={(e) => setProposalTitle(e.target.value)}
            className="w-full px-3 py-2 bg-darkGray border border-gold rounded text-white placeholder-gray-500 mb-3"
          />
          <textarea
            placeholder="Proposal description..."
            className="w-full px-3 py-2 bg-darkGray border border-gold rounded text-white placeholder-gray-500 mb-3 h-24"
          />
          <button
            onClick={handleSubmitProposal}
            className="w-full py-2 bg-gold hover:bg-darkGold text-dark font-bold rounded transition"
          >
            Submit
          </button>
        </div>
      )}

      <div className="space-y-4">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="p-4 bg-dark border border-gold/30 rounded-lg hover:border-gold transition">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-semibold">{proposal.title}</h3>
              <span className={`px-3 py-1 rounded text-sm font-bold ${
                proposal.status === 'Active' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-600 text-white'
              }`}>
                {proposal.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Votes: {proposal.votes.toLocaleString()}</span>
              {proposal.status === 'Active' && (
                <button className="px-3 py-1 bg-gold hover:bg-darkGold text-dark font-bold rounded text-sm transition">
                  Vote
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
