import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, MessageCircle, ExternalLink, Users, Sparkles } from 'lucide-react';

/**
 * Team & Community Section
 * Founder info, community engagement, and social links
 */
export const TeamCommunitySection: React.FC = () => {
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

  const socialLinks = [
    {
      name: 'X (Twitter)',
      handle: '@Newton_crypt',
      description: 'Follow for protocol updates and governance threads',
      icon: Twitter,
      href: 'https://twitter.com/Newton_crypt',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'GitHub',
      handle: 'newton411',
      description: 'Open-source contracts and dev documentation',
      icon: Github,
      href: 'https://github.com/newton411/AI-solutions',
      color: 'from-gray-600 to-gray-800',
    },
    {
      name: 'Discord',
      handle: 'Supra Labs',
      description: 'Join the community in Supra Discord channels',
      icon: MessageCircle,
      href: 'https://discord.gg/supralabs',
      color: 'from-purple-500 to-indigo-500',
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950/10 via-transparent to-cyan-950/10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-semibold">BUILT BY COMMUNITY</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent font-heading">
            Team & Community
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            SUPLOCK is a community-driven protocol. Get involved, share ideas, and help shape the future of Supra's DeFi
            ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Founder Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="glass-cyan rounded-xl p-8 text-center hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
              {/* Avatar */}
              <motion.div
                className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 mx-auto mb-6 flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1 }}
              >
                <Sparkles className="w-12 h-12 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-2">Newton</h3>
              <p className="text-cyan-400 font-semibold mb-4">@Newton_crypt • Founder</p>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Building innovative DeFi solutions on Supra L1. Passionate about sustainable tokenomics, community
                governance, and revolutionary yield mechanisms.
              </p>

              <motion.a
                href="https://twitter.com/Newton_crypt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-4 h-4" />
                Follow
              </motion.a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <motion.div
                className="glass-cyan rounded-lg p-4 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-2xl font-bold text-cyan-300">4</p>
                <p className="text-xs text-gray-400 mt-1">Phases Planned</p>
              </motion.div>
              <motion.div
                className="glass-cyan rounded-lg p-4 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-2xl font-bold text-cyan-300">2026+</p>
                <p className="text-xs text-gray-400 mt-1">Multi-Year Vision</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Community Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className="group glass-cyan rounded-xl p-6 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 flex items-center gap-4"
                    whileHover={{ x: 8 }}
                  >
                    <div className={`p-4 rounded-lg bg-gradient-to-br ${link.color} bg-opacity-20`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-1">{link.name}</h4>
                      <p className="text-sm text-cyan-400 font-semibold mb-1">{link.handle}</p>
                      <p className="text-sm text-gray-400">{link.description}</p>
                    </div>

                    <ExternalLink className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Community CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8 p-8 glass-cyan rounded-xl border-2 border-cyan-500/30"
            >
              <h4 className="text-xl font-bold text-cyan-300 mb-3">🚀 Join the Revolution</h4>
              <p className="text-gray-300 mb-6">
                Be part of SUPLOCK's journey. Participate in governance votes, propose new features, and help build the
                future of DeFi on Supra L1.
              </p>
              <motion.button
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Involved
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            {
              emoji: '🔓',
              title: 'Open Source',
              description: 'Full transparency. All contracts auditable and forkable on GitHub.',
            },
            {
              emoji: '🗳️',
              title: 'DAO Governed',
              description: 'Community members control protocol parameters via veSUPRA voting.',
            },
            {
              emoji: '🤝',
              title: 'Community First',
              description: 'Built by $SUPRA holders, for $SUPRA holders. Shared success.',
            },
          ].map((value, idx) => (
            <motion.div
              key={idx}
              className="glass-cyan rounded-lg p-6 text-center hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">{value.emoji}</div>
              <h5 className="font-bold text-white mb-2">{value.title}</h5>
              <p className="text-sm text-gray-400">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamCommunitySection;
