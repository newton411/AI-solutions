import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Zap, Shield, TrendingUp, Users, DollarSign, Menu, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const SUPLOCK_APP = () => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [suprBalance, setSuprBalance] = useState('0');
  const [lockAmount, setLockAmount] = useState('');
  const [lockDuration, setLockDuration] = useState(3);
  const [veSupraBalance, setVeSupraBalance] = useState('0');
  const [currentBoost, setCurrentBoost] = useState(1.0);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setConnected(true);
        setSuprBalance('1000000');
        toast.success('Wallet connected successfully!');
      } catch (error) {
        toast.error('Failed to connect wallet');
      }
    } else {
      setAccount('0x1234...5678');
      setConnected(true);
      setSuprBalance('1000000');
      toast.success('Demo wallet connected!');
    }
  };

  const calculateBoost = (months) => {
    const maxMonths = 48;
    return 1 + (months / maxMonths) * 1.5;
  };

  const lockTokens = async () => {
    if (!lockAmount || !connected) return;
    toast.loading('Locking tokens...', { id: 'lock' });
    await new Promise(resolve => setTimeout(resolve, 2000));
    setVeSupraBalance(lockAmount);
    setCurrentBoost(calculateBoost(lockDuration));
    toast.success(`Locked ${lockAmount} SUPRA for ${lockDuration} months!`, { id: 'lock' });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'lock', label: 'Lock', icon: '🔒' },
    { id: 'governance', label: 'Governance', icon: '🗳️' },
    { id: 'vaults', label: 'Vaults', icon: '⚡' },
    { id: 'dividends', label: 'Dividends', icon: '💰' },
  ];

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(0,0,0,0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,215,0,0.2)',
          padding: '16px 20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
            whileHover={{ scale: 1.05 }}
          >
            <span style={{ fontSize: '24px' }}>⛓️</span>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(to right, #FFD700, #DAA520)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
                SUPLOCK
              </h1>
              <div style={{ fontSize: '10px', color: '#888', marginTop: '-2px' }}>Supra L1</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div style={{ display: 'none', gap: '4px', '@media (min-width: 768px)': { display: 'flex' } }}>
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === tab.id ? '#FFD700' : 'transparent',
                  color: activeTab === tab.id ? '#000' : '#ccc',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                  transition: 'all 0.2s'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span style={{ marginRight: '8px' }}>{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={connectWallet}
              style={{
                backgroundColor: connected ? '#333' : '#FFD700',
                color: connected ? '#FFD700' : '#000',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {connected ? `${account.slice(0,6)}...${account.slice(-4)}` : 'Connect Wallet'}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'block', '@media (min-width: 768px)': { display: 'none' }, background: 'none', border: 'none', color: '#FFD700', cursor: 'pointer' }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              zIndex: 40,
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(10px)',
              borderBottom: '1px solid rgba(255,215,0,0.2)',
              padding: '16px'
            }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  marginBottom: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === tab.id ? '#FFD700' : 'transparent',
                  color: activeTab === tab.id ? '#000' : '#ccc',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? 'bold' : 'normal'
                }}
                whileHover={{ x: 4 }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main style={{ paddingTop: '80px' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Section */}
              <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {/* Animated Background */}
                <div style={{ position: 'absolute', inset: 0 }}>
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '80px',
                      left: '80px',
                      width: '300px',
                      height: '300px',
                      background: 'rgba(255,215,0,0.1)',
                      borderRadius: '50%',
                      filter: 'blur(60px)'
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '24px', background: 'linear-gradient(to right, #fff, #FFD700, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      SUPLOCK
                    </h1>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '24px' }}>
                      Sustainable DeFi on <span style={{ color: '#FFD700' }}>Supra L1</span>
                    </h2>
                    <p style={{ fontSize: '1.25rem', color: '#ccc', maxWidth: '800px', margin: '0 auto 32px', lineHeight: '1.6' }}>
                      Lock $SUPRA tokens to earn boosted yields up to 2.5x, participate in governance, and benefit from automated fee distribution with privacy-first MEV protection.
                    </p>

                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <motion.button
                        onClick={() => setActiveTab('lock')}
                        style={{
                          padding: '16px 32px',
                          background: 'linear-gradient(to right, #FFD700, #DAA520)',
                          color: '#000',
                          border: 'none',
                          borderRadius: '12px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Zap size={20} />
                        Start Locking
                      </motion.button>
                      
                      <motion.a
                        href="https://gamma.app/docs/Sustainable-DeFi-7jabltpt95th05k"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '16px 32px',
                          border: '2px solid #FFD700',
                          color: '#FFD700',
                          background: 'transparent',
                          borderRadius: '12px',
                          fontWeight: 'bold',
                          textDecoration: 'none',
                          cursor: 'pointer'
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        Read Whitepaper
                      </motion.a>
                    </div>
                  </motion.div>

                  {/* Stats Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', maxWidth: '800px', margin: '64px auto 0' }}
                  >
                    {[
                      { label: 'Total Locked', value: '12.5B SUPRA', icon: Lock },
                      { label: 'Protocol Fees', value: '$2.3M', icon: DollarSign },
                      { label: 'Active Users', value: '1,247', icon: Users },
                      { label: 'APY Range', value: '8-25%', icon: TrendingUp },
                    ].map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          style={{
                            background: 'rgba(17,17,17,0.5)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,215,0,0.2)',
                            borderRadius: '12px',
                            padding: '24px',
                            textAlign: 'center'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                            <div style={{ padding: '8px', background: 'rgba(255,215,0,0.1)', borderRadius: '8px' }}>
                              <Icon size={24} color="#FFD700" />
                            </div>
                          </div>
                          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFD700', marginBottom: '4px' }}>{stat.value}</div>
                          <div style={{ fontSize: '14px', color: '#888' }}>{stat.label}</div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'lock' && (
            <motion.div
              key="lock"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '40px 20px' }}
            >
              <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                  <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '16px' }}>Lock Your $SUPRA</h2>
                  <p style={{ fontSize: '1.25rem', color: '#ccc' }}>Earn boosted yields up to 2.5x and participate in protocol governance</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
                  {/* Lock Interface */}
                  <div style={{ background: '#111', padding: '24px', borderRadius: '12px', border: '1px solid #FFD700' }}>
                    <h3 style={{ color: '#FFD700', marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>🔒 Lock SUPRA</h3>
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Amount</label>
                      <input
                        type="number"
                        value={lockAmount}
                        onChange={(e) => setLockAmount(e.target.value)}
                        placeholder="Enter SUPRA amount"
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: '#222',
                          border: '1px solid #444',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '16px'
                        }}
                      />
                      <small style={{ color: '#888' }}>Balance: {parseInt(suprBalance).toLocaleString()} SUPRA</small>
                    </div>
                    
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Lock Duration: {lockDuration} months</label>
                      <input
                        type="range"
                        min="3"
                        max="48"
                        value={lockDuration}
                        onChange={(e) => setLockDuration(parseInt(e.target.value))}
                        style={{ width: '100%' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888' }}>
                        <span>3m</span>
                        <span>48m</span>
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px', padding: '16px', background: '#222', borderRadius: '8px' }}>
                      <div style={{ color: '#FFD700', fontSize: '18px', fontWeight: 'bold' }}>Boost Multiplier: {calculateBoost(lockDuration).toFixed(2)}x</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>Higher boost = More rewards</div>
                    </div>

                    <motion.button
                      onClick={lockTokens}
                      disabled={!lockAmount}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: lockAmount ? '#FFD700' : '#444',
                        color: lockAmount ? '#000' : '#888',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: lockAmount ? 'pointer' : 'not-allowed',
                        fontSize: '16px'
                      }}
                      whileHover={lockAmount ? { scale: 1.02 } : {}}
                      whileTap={lockAmount ? { scale: 0.98 } : {}}
                    >
                      Lock Tokens
                    </motion.button>
                  </div>

                  {/* How it Works */}
                  <div style={{ background: 'rgba(17,17,17,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: '12px', padding: '24px' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '24px' }}>How Locking Works</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {[
                        { step: '1', title: 'Choose Amount', desc: 'Select how much $SUPRA to lock' },
                        { step: '2', title: 'Select Duration', desc: 'Lock for 3-48 months for higher boosts' },
                        { step: '3', title: 'Receive veSUPRA', desc: 'Get soulbound NFT for governance' },
                        { step: '4', title: 'Earn Rewards', desc: 'Base APR + boost multiplier yields' },
                      ].map((item) => (
                        <div key={item.step} style={{ display: 'flex', gap: '16px' }}>
                          <div style={{ flexShrink: 0, width: '32px', height: '32px', background: '#FFD700', color: '#000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
                            {item.step}
                          </div>
                          <div>
                            <h4 style={{ fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>{item.title}</h4>
                            <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other tabs with placeholder content */}
          {['governance', 'vaults', 'dividends'].map(tab => (
            activeTab === tab && (
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}
              >
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '16px', textTransform: 'capitalize' }}>{tab}</h2>
                  <p style={{ fontSize: '1.25rem', color: '#ccc' }}>Coming soon...</p>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </main>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#111',
            color: '#FFD700',
            border: '1px solid #FFD700',
          },
        }}
      />
    </div>
  );
};

export default SUPLOCK_APP;