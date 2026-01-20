import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Zap, Shield, TrendingUp, Users, DollarSign } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const stats = [
    { label: 'Total Locked', value: '12.5B SUPRA', icon: Lock },
    { label: 'Protocol Fees', value: '$2.3M', icon: DollarSign },
    { label: 'Active Users', value: '1,247', icon: Users },
    { label: 'APY Range', value: '8-25%', icon: TrendingUp },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/20 to-black" />
        <motion.div
          className="absolute top-32 left-10 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-10 right-5 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-6 py-2.5 mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-semibold tracking-wide">Audited & Secure Protocol</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent font-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            SUPLOCK
          </motion.h1>

          <motion.h2
            className="text-xl sm:text-2xl md:text-4xl font-bold mb-8 text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Immutable Security for Your Assets on{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Supra L1</span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Lock $SUPRA tokens with the legendary Spartan protocol to earn boosted yields up to{' '}
            <span className="text-cyan-400 font-semibold">2.5x</span>, participate in decentralized governance, and
            benefit from automated fee distribution with{' '}
            <span className="text-cyan-400 font-semibold">privacy-first MEV protection</span>.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              onClick={onGetStarted}
              className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30 w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Start locking tokens"
            >
              <span className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Start Locking
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            </motion.button>

            <motion.a
              href="https://gamma.app/docs/Sustainable-DeFi-7jabltpt95th05k"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold rounded-xl transition-all duration-300 w-full sm:w-auto text-center"
              whileHover={{ scale: 1.05, y: -2, borderColor: 'rgba(0, 229, 255, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              Read Whitepaper
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mt-12 sm:mt-16"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="group glass-cyan rounded-xl p-4 sm:p-6 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-cyan-300 mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {[
            {
              icon: Lock,
              title: 'Vote-Escrow Locking',
              description: 'Lock $SUPRA for up to 4 years and earn up to 2.5x boost multiplier on all rewards.',
            },
            {
              icon: Shield,
              title: 'Spartan Protection',
              description: 'LP Vacuum encrypts transactions and our legendary protocol defends against front-running.',
            },
            {
              icon: TrendingUp,
              title: 'Yield Optimization',
              description: 'Auto-compounding vaults with PT/YT splitting and dual restaking integration.',
            },
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="group glass-cyan rounded-xl p-6 sm:p-8 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4 sm:mb-6">
                    <div className="p-3 sm:p-4 bg-cyan-500/20 rounded-xl group-hover:bg-cyan-500/30 transition-colors">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
