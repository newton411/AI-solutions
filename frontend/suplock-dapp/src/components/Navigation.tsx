import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink } from 'lucide-react';
import { WalletConnectButton } from './WalletConnectButton';
import { SpartanMascot } from './SpartanMascot';

type Tab = 'overview' | 'lock' | 'governance' | 'vaults' | 'dividends';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

/**
 * Enhanced Navigation with Spartan Mascot Integration
 * - Minimalist Spartan helmet logo
 * - Refined cyan/blue color scheme
 * - Improved responsive design
 * - Better accessibility
 */
export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: '🏠' },
    { id: 'lock' as Tab, label: 'Lock', icon: '🔒' },
    { id: 'governance' as Tab, label: 'Governance', icon: '🗳️' },
    { id: 'vaults' as Tab, label: 'Vaults', icon: '⚡' },
    { id: 'dividends' as Tab, label: 'Dividends', icon: '💰' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-cyan-500/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo with Spartan Mascot */}
            <motion.div
              className="flex items-center gap-2 sm:gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              onClick={() => onTabChange('overview')}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-1.5 sm:p-2 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/20">
                <SpartanMascot size="sm" variant="icon" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent font-heading">
                  SUPLOCK
                </h1>
                <p className="text-xs text-cyan-600/80 -mt-1 font-medium tracking-widest">SUPRA L1</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`relative px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm ${
                    activeTab === tab.id
                      ? 'text-black bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/20'
                      : 'text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="flex items-center gap-2">
                    <span>{tab.icon}</span>
                    {tab.label}
                  </span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg -z-10 shadow-lg shadow-cyan-500/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2 sm:gap-4">
              <motion.a
                href="https://gamma.app/docs/Sustainable-DeFi-7jabltpt95th05k"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 border border-transparent hover:border-cyan-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>📖</span>
                <span>Docs</span>
                <ExternalLink className="w-3 h-3" />
              </motion.a>

              <WalletConnectButton />

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 sm:top-20 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-cyan-500/20 md:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-black bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/20'
                      : 'text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.label}</span>
                </motion.button>
              ))}

              <motion.a
                href="https://gamma.app/docs/Sustainable-DeFi-7jabltpt95th05k"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-4 py-3 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-colors"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>📖</span>
                <span>Documentation</span>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
