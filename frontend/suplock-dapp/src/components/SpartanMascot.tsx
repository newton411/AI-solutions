import React from 'react';
import { motion } from 'framer-motion';

interface SpartanMascotProps {
  variant?: 'hero' | 'icon' | 'badge' | 'loading' | 'empty-state';
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Spartan Mascot Component
 * Minimalist, stylized Spartan imagery representing:
 * - Strength & Unbreakable Security
 * - Discipline & Reliability
 * - Trust & Protection
 */
export const SpartanMascot: React.FC<SpartanMascotProps> = ({
  variant = 'icon',
  animated = false,
  size = 'md',
  className = '',
}) => {
  // Size mappings
  const sizeMap = {
    sm: 40,
    md: 80,
    lg: 160,
    xl: 240,
  };

  const currentSize = sizeMap[size];

  // Helmet icon - minimalist Spartan helmet with lambda plume and lock/shield
  const HelmetIcon = () => (
    <svg
      viewBox="0 0 100 100"
      className={className}
      width={currentSize}
      height={currentSize}
    >
      <defs>
        <linearGradient id="helmetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#00BFFF" />
        </linearGradient>
      </defs>

      {/* Helmet main body */}
      <path
        d="M 30 40 Q 30 30 50 30 Q 70 30 70 40 L 70 60 Q 70 75 50 75 Q 30 75 30 60 Z"
        fill="url(#helmetGradient)"
        stroke="#00E5FF"
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* Face guard bars */}
      <line x1="40" y1="45" x2="40" y2="70" stroke="#00BFFF" strokeWidth="1.5" opacity="0.6" />
      <line x1="50" y1="45" x2="50" y2="70" stroke="#00BFFF" strokeWidth="1.5" opacity="0.6" />
      <line x1="60" y1="45" x2="60" y2="70" stroke="#00BFFF" strokeWidth="1.5" opacity="0.6" />

      {/* Lambda plume symbol (inverted V - Λ) */}
      <path
        d="M 45 35 L 50 22 L 55 35"
        stroke="#FFD700"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Shield/lock symbol in center */}
      <g transform="translate(50, 57)">
        {/* Shield outline */}
        <path
          d="M 0 -8 L -8 -5 L -8 0 Q 0 8 0 12 Q 0 8 8 0 L 8 -5 Z"
          fill="none"
          stroke="#FFD700"
          strokeWidth="1"
          opacity="0.8"
        />
        {/* Lock symbol */}
        <circle cx="0" cy="0" r="3" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.8" />
        <path d="M -2 0 L 2 0" stroke="#FFD700" strokeWidth="1" opacity="0.8" />
      </g>

      {/* Glow effect */}
      <circle cx="50" cy="55" r="38" fill="none" stroke="#00E5FF" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );

  // Hero warrior silhouette - standing Spartan with shield
  const HeroWarrior = () => (
    <svg
      viewBox="0 0 120 200"
      className={className}
      width={currentSize}
      height={currentSize}
    >
      <defs>
        <linearGradient id="warriorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A1F2E" />
          <stop offset="100%" stopColor="#0F1629" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Shield (left side) */}
      <path
        d="M 25 60 L 15 80 Q 15 110 40 130 Q 40 110 40 80 Z"
        fill="url(#warriorGradient)"
        stroke="#00E5FF"
        strokeWidth="1.5"
        filter="url(#glow)"
      />

      {/* Shield emblem - lock with chain */}
      <g transform="translate(27, 95)">
        <circle cx="0" cy="0" r="8" fill="none" stroke="#FFD700" strokeWidth="1.5" />
        <path
          d="M -3 0 L 3 0 M 0 -3 L 0 3"
          stroke="#FFD700"
          strokeWidth="1"
          opacity="0.9"
        />
      </g>

      {/* Body/Torso */}
      <ellipse cx="60" cy="90" rx="18" ry="25" fill="#1A1F2E" stroke="#00BFFF" strokeWidth="1.5" />

      {/* Helmet */}
      <ellipse cx="60" cy="50" rx="16" ry="18" fill="url(#warriorGradient)" stroke="#00E5FF" strokeWidth="1.5" />

      {/* Helmet plume - Lambda */}
      <path
        d="M 52 30 L 60 15 L 68 30"
        stroke="#FFD700"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Legs */}
      <line x1="50" y1="115" x2="45" y2="160" stroke="#00BFFF" strokeWidth="3" />
      <line x1="70" y1="115" x2="75" y2="160" stroke="#00BFFF" strokeWidth="3" />

      {/* Spear (right side) */}
      <line x1="85" y1="40" x2="105" y2="10" stroke="#00E5FF" strokeWidth="2" />
      <polygon points="105,10 108,5 102,7" fill="#FFD700" />

      {/* Glow aura */}
      <circle cx="60" cy="90" r="45" fill="none" stroke="#00E5FF" strokeWidth="0.5" opacity="0.2" />
      <circle cx="60" cy="90" r="50" fill="none" stroke="#00E5FF" strokeWidth="0.3" opacity="0.1" />
    </svg>
  );

  // Badge/seal variant
  const SecurityBadge = () => (
    <svg
      viewBox="0 0 100 100"
      className={className}
      width={currentSize}
      height={currentSize}
    >
      <defs>
        <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#00BFFF" />
        </linearGradient>
      </defs>

      {/* Outer circle */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#badgeGradient)" strokeWidth="2" />

      {/* Inner circle */}
      <circle cx="50" cy="50" r="38" fill="#0B0E17" stroke="#FFD700" strokeWidth="1" opacity="0.8" />

      {/* Shield shape */}
      <path
        d="M 50 25 L 32 35 L 32 55 Q 50 70 50 70 Q 50 70 68 55 L 68 35 Z"
        fill="none"
        stroke="url(#badgeGradient)"
        strokeWidth="2"
      />

      {/* Lock icon */}
      <g transform="translate(50, 50)">
        <circle cx="0" cy="-3" r="5" fill="none" stroke="#FFD700" strokeWidth="1.5" />
        <rect x="-6" y="3" width="12" height="10" rx="1" fill="none" stroke="#FFD700" strokeWidth="1.5" />
        <path d="M -2 3 L -2 8" stroke="#FFD700" strokeWidth="1" />
      </g>

      {/* Text arc */}
      <defs>
        <path id="curve" d="M 20, 50 A 30, 30 0 0, 1 80, 50" fill="none" />
      </defs>
      <text fill="#FFD700" fontSize="10" fontWeight="bold" letterSpacing="2" opacity="0.8">
        <textPath href="#curve" startOffset="50%" textAnchor="middle">
          SECURED
        </textPath>
      </text>
    </svg>
  );

  // Loading animation variant
  const LoadingSpinning = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      className={className}
    >
      <HelmetIcon />
    </motion.div>
  );

  // Render based on variant
  const renderVariant = () => {
    switch (variant) {
      case 'hero':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={className}
          >
            <HeroWarrior />
          </motion.div>
        );
      case 'badge':
        return <SecurityBadge />;
      case 'loading':
        return <LoadingSpinning />;
      case 'empty-state':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 0.5 }}
            className={className}
          >
            <HelmetIcon />
          </motion.div>
        );
      case 'icon':
      default:
        return animated ? <LoadingSpinning /> : <HelmetIcon />;
    }
  };

  return renderVariant();
};

export default SpartanMascot;
