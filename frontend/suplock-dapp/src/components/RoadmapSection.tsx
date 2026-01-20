import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Zap, Star, TrendingUp, Lock } from 'lucide-react';

interface Phase {
  id: number;
  name: string;
  timeline: string;
  status: 'complete' | 'current' | 'upcoming';
  milestones: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

/**
 * Roadmap Section Component
 * Visual timeline with phases, milestones, and progress indicators
 * Showcases SUPLOCK's 4-phase evolution through 2027
 */
export const RoadmapSection: React.FC = () => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  const phases: Phase[] = [
    {
      id: 1,
      name: 'Phase 1: Foundation',
      timeline: 'Complete • Q1 2026',
      status: 'complete',
      milestones: [
        {
          title: 'Whitepaper Launch',
          description: 'Comprehensive protocol documentation & economics',
          icon: <CheckCircle className="w-5 h-5" />,
        },
        {
          title: 'Core Contracts',
          description: 'BurnVault, LockStake, GovIncentivizer on Supra L1',
          icon: <Lock className="w-5 h-5" />,
        },
        {
          title: 'Deflation Model',
          description: 'Progressive burn mechanics targeting 10B supply floor',
          icon: <TrendingUp className="w-5 h-5" />,
        },
        {
          title: 'Community Bootstrap',
          description: 'Launch on Supra Discord & @Newton_crypt governance threads',
          icon: <Star className="w-5 h-5" />,
        },
      ],
    },
    {
      id: 2,
      name: 'Phase 2: Integration & Automation',
      timeline: 'Current • Q1-Q2 2026',
      status: 'current',
      milestones: [
        {
          title: 'iAssets Support',
          description: 'Dual PoEL yields + degen loops via supranova.ai',
          icon: <Zap className="w-5 h-5" />,
        },
        {
          title: 'AutoFi Primitives',
          description: 'Intent execution, auto-arbitrage, risk self-healing',
          icon: <Clock className="w-5 h-5" />,
        },
        {
          title: 'LiquidityHub',
          description: 'Unified routing to SupraLend, Solido Money, AtmosProtocol',
          icon: <TrendingUp className="w-5 h-5" />,
        },
        {
          title: 'Testnet → Mainnet',
          description: 'First audits + bug bounty program launch',
          icon: <CheckCircle className="w-5 h-5" />,
        },
      ],
    },
    {
      id: 3,
      name: 'Phase 3: Optimization & Expansion',
      timeline: 'Coming Soon • Q3-Q4 2026',
      status: 'upcoming',
      milestones: [
        {
          title: 'Advanced AutoFi',
          description: 'AI-augmented oracles for predictive routing',
          icon: <Zap className="w-5 h-5" />,
        },
        {
          title: 'Reverse Bridge',
          description: 'Cross-chain burns for multi-ecosystem deflation',
          icon: <TrendingUp className="w-5 h-5" />,
        },
        {
          title: 'Enterprise Vaults',
          description: 'Institutional containers with compliance hooks',
          icon: <Lock className="w-5 h-5" />,
        },
        {
          title: 'Degen Dashboards',
          description: 'One-click strategies + full strategy customization',
          icon: <Star className="w-5 h-5" />,
        },
      ],
    },
    {
      id: 4,
      name: 'Phase 4: Maturity & Dominance',
      timeline: 'Long-Term • 2027+',
      status: 'upcoming',
      milestones: [
        {
          title: 'Supply Floor Reached',
          description: 'Transition to immortal dividend distributions',
          icon: <CheckCircle className="w-5 h-5" />,
        },
        {
          title: 'Ecosystem Integration',
          description: 'Official Supra grants & deep protocol integration',
          icon: <Star className="w-5 h-5" />,
        },
        {
          title: 'Cross-Chain Expansion',
          description: 'HyperNova bridgeless cross-chain deployments',
          icon: <TrendingUp className="w-5 h-5" />,
        },
        {
          title: 'Global Dominance',
          description: 'Sustainable 50%+ APY at $3B+ TVL with DAO control',
          icon: <Zap className="w-5 h-5" />,
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getStatusColor = (status: 'complete' | 'current' | 'upcoming') => {
    switch (status) {
      case 'complete':
        return {
          badge: 'bg-green-500/20 border-green-500/30 text-green-400',
          line: 'from-green-500 to-cyan-500',
          dot: 'bg-green-500',
          label: '✅ COMPLETE',
        };
      case 'current':
        return {
          badge: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
          line: 'from-cyan-500 to-blue-500',
          dot: 'bg-cyan-500 animate-pulse-glow',
          label: '🚀 LIVE NOW',
        };
      case 'upcoming':
        return {
          badge: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
          line: 'from-blue-500 to-purple-500',
          dot: 'bg-blue-500',
          label: '⏳ COMING SOON',
        };
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-cyan-950/10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-semibold">SUPLOCK EVOLUTION</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent font-heading">
            Our Roadmap to Dominance
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A 4-phase journey to establish SUPLOCK as Supra's premier DeFi protocol with sustainable yields and
            automated treasury management.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-6"
        >
          {phases.map((phase, index) => {
            const statusColor = getStatusColor(phase.status);
            const isExpanded = expandedPhase === phase.id;

            return (
              <motion.div key={phase.id} variants={itemVariants} className="relative">
                {/* Timeline connector line */}
                {index < phases.length - 1 && (
                  <div className="absolute left-6 sm:left-8 top-24 w-1 h-12 bg-gradient-to-b from-cyan-500/30 to-transparent" />
                )}

                {/* Phase Card */}
                <motion.button
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                  className="w-full glass-cyan rounded-xl p-6 sm:p-8 text-left hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {/* Status dot */}
                        <div
                          className={`w-4 h-4 rounded-full ${statusColor.dot} flex-shrink-0`}
                        />

                        {/* Status badge */}
                        <span className={`text-xs font-bold tracking-wider px-2.5 py-1 rounded-full border ${statusColor.badge}`}>
                          {statusColor.label}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{phase.name}</h3>
                      <p className="text-sm text-gray-400">{phase.timeline}</p>
                    </div>

                    {/* Expand icon */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-cyan-400 flex-shrink-0"
                    >
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                  </div>

                  {/* Expanded Milestones */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: isExpanded ? 1 : 0,
                      height: isExpanded ? 'auto' : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-cyan-500/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {phase.milestones.map((milestone, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/10 hover:border-cyan-500/30 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-cyan-400 mt-1 flex-shrink-0">{milestone.icon}</div>
                            <div>
                              <h4 className="font-semibold text-white text-sm">{milestone.title}</h4>
                              <p className="text-xs text-gray-400 mt-1">{milestone.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Timeline Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 sm:p-8 glass-cyan rounded-xl border-2 border-cyan-500/30"
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl">🎯</div>
            <div>
              <h3 className="text-xl font-bold text-cyan-300 mb-2">The Vision</h3>
              <p className="text-gray-300">
                SUPLOCK will evolve from a deflationary locking protocol into Supra's DeFi brain—automating treasury
                strategies, maximizing community yields, and maintaining a sustainable flywheel through all market
                cycles.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Chevron icon component
const ChevronDown = ({ className }: { className: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

export default RoadmapSection;
