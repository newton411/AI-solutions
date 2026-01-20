import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Lock, Shield, TrendingUp, Flame, Users, Rocket, Infinity } from 'lucide-react';

/**
 * About Section Component
 * Mission statement, value proposition, and key differentiators
 */
export const AboutSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/10 via-transparent to-blue-950/10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent font-heading">
            About SUPLOCK
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Built by the community for $SUPRA holders. SUPLOCK revolutionizes tokenomics through deflationary mechanics,
            automated yield optimization, and decentralized governance—all on Supra L1.
          </p>
        </motion.div>

        {/* Core Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {[
            {
              title: 'Burn to Floor',
              description: 'Progressive deflationary mechanics targeting 10B supply floor, creating scarcity and sustainable value.',
              icon: Flame,
              color: 'from-orange-500 to-red-500',
            },
            {
              title: 'Yield Forever',
              description: 'Transition to immortal dividends after floor reached, ensuring perpetual rewards for locked token holders.',
              icon: Infinity,
              color: 'from-cyan-500 to-blue-500',
            },
            {
              title: 'Automation First',
              description: 'AutoFi primitives and intent-based execution minimize user friction and maximize capital efficiency.',
              icon: Rocket,
              color: 'from-purple-500 to-pink-500',
            },
            {
              title: 'Community Governed',
              description: 'Full DAO control with veSUPRA voting rights. Holders shape protocol evolution through proposals.',
              icon: Users,
              color: 'from-green-500 to-emerald-500',
            },
          ].map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="group glass-cyan rounded-xl p-8 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${value.color} bg-opacity-20 mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 glass-cyan rounded-xl border-2 border-cyan-500/30 text-center"
        >
          <p className="text-xl sm:text-2xl font-semibold text-cyan-300 mb-4">Our Mission</p>
          <p className="text-lg text-gray-300 leading-relaxed">
            To establish SUPLOCK as Supra's premier DeFi protocol by combining deflationary economics, sustainable
            yields, and intelligent automation. We're building the infrastructure for $SUPRA to thrive through all market
            cycles while maintaining community control and radical transparency.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * Features Section Component
 * Comprehensive feature showcase with visual hierarchy
 */
export const FeaturesSection: React.FC = () => {
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

  const features = [
    {
      title: 'Vote-Escrow Locking',
      description: 'Lock $SUPRA for 3-48 months to earn veSUPRA with up to 2.5x boost multiplier on all rewards.',
      icon: Lock,
      metric: 'Up to 2.5x',
      highlighted: true,
    },
    {
      title: 'MEV Protection',
      description: 'Private transactions via LP Vacuum. Block front-running, sandwich attacks, and extractive behaviors.',
      icon: Shield,
      metric: 'Privacy First',
      highlighted: true,
    },
    {
      title: 'Automated Yields',
      description: 'Auto-compounding vaults with PT/YT splitting. Dual restaking integration for maximum capital efficiency.',
      icon: TrendingUp,
      metric: 'Always Optimizing',
      highlighted: false,
    },
    {
      title: 'Governance Rights',
      description: 'veSUPRA tokens unlock voting power in DAO. Shape protocol fees, incentives, and strategic direction.',
      icon: Users,
      metric: 'Community Owned',
      highlighted: false,
    },
    {
      title: 'Fee Distribution',
      description: 'Automated USDC dividend distributions from protocol fees. Direct rewards for locked token holders.',
      icon: Zap,
      metric: 'Passive Income',
      highlighted: false,
    },
    {
      title: 'Multi-Chain Intent',
      description: 'Cross-chain burn mechanics via Reverse Bridge. Sustainable deflation across multiple ecosystems.',
      icon: Rocket,
      metric: 'Global Reach',
      highlighted: false,
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-semibold">CORE CAPABILITIES</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent font-heading">
            Powerful Features for DeFi Excellence
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Everything you need to maximize your $SUPRA holdings through deflationary economics, automated strategies,
            and sustainable yield generation.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className={`group glass-cyan rounded-xl p-8 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden ${
                  feature.highlighted ? 'lg:col-span-1 md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Highlighted badge */}
                {feature.highlighted && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-xs font-bold text-white">
                    ⭐ ESSENTIAL
                  </div>
                )}

                <div className="mb-6">
                  <div className="inline-flex p-3 rounded-xl bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>

                <div className="pt-4 border-t border-cyan-500/20 flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">{feature.metric}</span>
                  <motion.div
                    className="text-cyan-400"
                    whileHover={{ x: 4 }}
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400 mb-6">Ready to start maximizing your $SUPRA holdings?</p>
          <motion.a
            href="#lock"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lock className="w-5 h-5" />
            Start Locking Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default { AboutSection, FeaturesSection };
