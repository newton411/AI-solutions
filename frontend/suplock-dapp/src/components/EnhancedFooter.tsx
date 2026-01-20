import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, MessageCircle, Shield, Lock, TrendingUp, Mail, ExternalLink } from 'lucide-react';
import { SpartanMascot } from './SpartanMascot';

/**
 * Enhanced Footer with Social Links & Trust Indicators
 * Includes Spartan mascot, comprehensive community links, and security badges
 */
export const EnhancedFooter: React.FC = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/newton411/AI-solutions',
      label: 'View Contracts',
      category: 'Development',
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      href: 'https://twitter.com/Newton_crypt',
      label: '@Newton_crypt',
      category: 'Community',
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      href: 'https://discord.gg/supralabs',
      label: 'Supra Labs',
      category: 'Community',
    },
  ];

  const trustIndicators = [
    {
      icon: Shield,
      title: 'Audited Protocol',
      description: 'Security-first smart contracts',
    },
    {
      icon: Lock,
      title: 'Private Transactions',
      description: 'MEV-protected via LP Vacuum',
    },
    {
      icon: TrendingUp,
      title: 'Sustainable Yields',
      description: 'Up to 2.5x boost multiplier',
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

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative border-t border-cyan-500/20 bg-gradient-to-b from-transparent via-blue-950/5 to-black/40 py-16 px-4"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main footer content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="flex flex-col items-start md:col-span-2 lg:col-span-1">
            <motion.div
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-2 flex items-center justify-center">
                <SpartanMascot size="sm" variant="icon" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  SUPLOCK
                </h3>
                <p className="text-xs text-gray-500">Protocol v1.0</p>
              </div>
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Immutable security for your blockchain assets on Supra L1. Vote-escrow tokenomics with privacy-first MEV protection.
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-cyan-300 uppercase tracking-widest">Security</h4>
            <div className="space-y-3">
              {trustIndicators.map((indicator) => {
                const Icon = indicator.icon;
                return (
                  <motion.div
                    key={indicator.title}
                    className="flex items-start gap-3 group"
                    whileHover={{ x: 4 }}
                  >
                    <Icon className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0 group-hover:text-cyan-300 transition-colors" />
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                        {indicator.title}
                      </p>
                      <p className="text-xs text-gray-500">{indicator.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-cyan-300 uppercase tracking-widest">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: 'Documentation', href: 'https://gamma.app/docs/Sustainable-DeFi-7jabltpt95th05k' },
                { label: 'Whitepaper', href: '#whitepaper' },
                { label: 'Analytics', href: '#analytics' },
                { label: 'Support', href: '#support' },
              ].map((link) => (
                <motion.li key={link.label} whileHover={{ x: 4 }}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-cyan-300 uppercase tracking-widest">Community</h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-cyan-300 transition-colors">
                      {social.name}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom section with divider */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-cyan-500/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-gray-500">
            <p>© 2025 SUPLOCK Protocol. Built on Supra L1.</p>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-cyan-400 transition-colors">
                Privacy
              </a>
              <a href="#terms" className="hover:text-cyan-400 transition-colors">
                Terms
              </a>
              <a href="#security" className="hover:text-cyan-400 transition-colors">
                Security
              </a>
            </div>
          </div>

          {/* Badge */}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
            whileHover={{ borderColor: 'rgba(0, 229, 255, 0.4)' }}
          >
            <SpartanMascot size="sm" variant="badge" />
            <span className="text-xs font-semibold text-cyan-400">Secured by SUPLOCK</span>
          </motion.div>
        </motion.div>

        {/* Accessibility note */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-xs text-gray-600 text-center"
        >
          SUPLOCK Protocol maintains WCAG 2.1 AA compliance for accessibility. 
          <a href="#accessibility" className="text-cyan-600 hover:text-cyan-400 ml-1">
            Learn more
          </a>
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default EnhancedFooter;
