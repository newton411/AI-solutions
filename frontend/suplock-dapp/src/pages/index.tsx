import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { WalletProvider } from '@/contexts/WalletContext';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection, FeaturesSection } from '@/components/AboutFeaturesSection';
import { RoadmapSection } from '@/components/RoadmapSection';
import { YieldCalculator } from '@/components/YieldCalculator';
import { TeamCommunitySection } from '@/components/TeamCommunitySection';
import { LockUI } from '@/components/LockUI';
import { TokenomicsCharts } from '@/components/TokenomicsCharts';
import { GovernancePanel } from '@/components/GovernancePanel';
import { VaultPanel } from '@/components/VaultPanel';
import { DividendPanel } from '@/components/DividendPanel';
import { EnhancedFooter } from '@/components/EnhancedFooter';

type Tab = 'overview' | 'lock' | 'governance' | 'vaults' | 'dividends';

/**
 * SUPLOCK Main Application
 * Enhanced layout with all sections:
 * - Hero with tagline "Burn to Floor. Yield Forever."
 * - About & Features
 * - Roadmap (4 phases)
 * - Yield Calculator
 * - Team & Community
 * - Enhanced Footer
 */
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isLocking, setIsLocking] = useState(false);

  const handleLock = async (amount: string, duration: number) => {
    setIsLocking(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`Successfully locked ${amount} SUPRA for ${Math.floor(duration / (30 * 24 * 60 * 60))} months!`);
      console.log(`Locked ${amount} SUPRA for ${duration} seconds`);
    } catch (error) {
      toast.error('Failed to lock tokens. Please try again.');
    } finally {
      setIsLocking(false);
    }
  };

  const tokenomicsData = {
    totalSupply: 100_000_000_000,
    burned: 8_500_000_000,
    dividendsPaid: 234_500_000,
    veRewards: 45_200_000,
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <WalletProvider>
      <Head>
        <title>SUPLOCK - Revolutionizing $SUPRA Tokenomics on Supra L1</title>
        <meta
          name="description"
          content="SUPLOCK: Burn to Floor. Yield Forever. Lock $SUPRA tokens to earn boosted yields up to 2.5x, participate in governance, and benefit from automated fee distribution with MEV protection."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="SUPLOCK - Deflation, Yields, Automation on Supra L1" />
        <meta
          property="og:description"
          content="The protocol powering sustainable DeFi. Join thousands of $SUPRA holders earning passive income."
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛡️</text></svg>" />
      </Head>

      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        <main>
          <AnimatePresence mode="wait">
            {/* Overview Tab - Complete Homepage */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {/* Hero Section */}
                <HeroSection onGetStarted={() => setActiveTab('lock')} />

                {/* About Section */}
                <AboutSection />

                {/* Features Section */}
                <FeaturesSection />

                {/* Yield Calculator */}
                <YieldCalculator />

                {/* Roadmap */}
                <RoadmapSection />

                {/* Team & Community */}
                <TeamCommunitySection />

                {/* Tokenomics Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-6xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-center mb-16"
                    >
                      <h2 className="text-4xl font-bold text-cyan-300 mb-4">Protocol Tokenomics</h2>
                      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Sustainable deflationary mechanics with automated fee distribution and governance incentives
                      </p>
                    </motion.div>
                    <TokenomicsCharts data={tokenomicsData} />
                  </div>
                </section>
              </motion.div>
            )}

            {/* Lock Tab */}
            {activeTab === 'lock' && (
              <motion.div
                key="lock"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="min-h-screen flex items-center justify-center px-4 py-20 pt-32"
              >
                <div className="max-w-4xl mx-auto w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-5xl font-bold text-cyan-300 mb-4">Lock Your $SUPRA</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                      Earn boosted yields up to 2.5x and participate in protocol governance
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <LockUI onLock={handleLock} isLoading={isLocking} />

                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="glass-cyan rounded-xl p-6 space-y-6"
                    >
                      <h3 className="text-2xl font-bold text-cyan-300">How Locking Works</h3>
                      <div className="space-y-4">
                        {[
                          { step: '1', title: 'Choose Amount', desc: 'Select how much $SUPRA to lock' },
                          { step: '2', title: 'Select Duration', desc: 'Lock for 3-48 months for higher boosts' },
                          { step: '3', title: 'Receive veSUPRA', desc: 'Get soulbound NFT for governance' },
                          { step: '4', title: 'Earn Rewards', desc: 'Base APR + boost multiplier yields' },
                        ].map((item) => (
                          <div key={item.step} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 text-black rounded-full flex items-center justify-center font-bold text-sm">
                              {item.step}
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">{item.title}</h4>
                              <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Governance Tab */}
            {activeTab === 'governance' && (
              <motion.div
                key="governance"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="px-4 py-20 pt-32"
              >
                <div className="max-w-6xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-5xl font-bold text-cyan-300 mb-4">Protocol Governance</h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                      Shape the future of SUPLOCK through decentralized governance
                    </p>
                  </motion.div>
                  <GovernancePanel />
                </div>
              </motion.div>
            )}

            {/* Vaults Tab */}
            {activeTab === 'vaults' && (
              <motion.div
                key="vaults"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="px-4 py-20 pt-32"
              >
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-5xl font-bold text-cyan-300 mb-4">Yield & Restaking</h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                      Maximize yields through auto-compounding vaults and dual restaking
                    </p>
                  </motion.div>
                  <VaultPanel />
                </div>
              </motion.div>
            )}

            {/* Dividends Tab */}
            {activeTab === 'dividends' && (
              <motion.div
                key="dividends"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="px-4 py-20 pt-32"
              >
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-5xl font-bold text-cyan-300 mb-4">Claim Dividends</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                      Receive USDC dividends from protocol fees automatically distributed
                    </p>
                  </motion.div>
                  <DividendPanel />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Enhanced Footer */}
        <EnhancedFooter />
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0B0E17',
            color: '#00E5FF',
            border: '1px solid #00E5FF',
            borderRadius: '8px',
          },
        }}
      />
    </WalletProvider>
  );
};

export default App;
