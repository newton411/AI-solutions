/**
 * SUPLOCK Design System - Color Tokens & Typography
 * Preserving the existing aesthetic while adding precision and refinement
 */

export const designTokens = {
  // Color Palette - Dark Mode with Cyan Accents
  colors: {
    // Primary Backgrounds
    background: {
      primary: '#0B0E17', // Dark base
      secondary: '#1A1F2E', // Deep blue
      tertiary: '#0F1629', // Darker blue
      purple: '#2A1B3D', // Deep purple accent
    },
    
    // Accents - Bright cyan/electric blue for CTAs
    accent: {
      cyan: '#00E5FF', // Bright cyan
      blue: '#00BFFF', // Electric blue
      gold: '#FFD700', // Legacy gold (preserved)
      darkGold: '#DAA520', // Legacy dark gold
    },
    
    // Text - High contrast for accessibility
    text: {
      primary: '#FFFFFF', // White for headings
      secondary: '#E2E8F0', // Light gray for body
      tertiary: '#94A3B8', // Muted gray for secondary info
      muted: '#64748B', // Muted for disabled states
    },
    
    // Feedback States
    feedback: {
      success: '#10B981', // Success green
      warning: '#F59E0B', // Warning amber
      error: '#EF4444', // Error red
      info: '#3B82F6', // Info blue
    },
    
    // Borders & Overlays
    border: {
      light: 'rgba(255, 215, 0, 0.2)', // Gold with transparency
      lighter: 'rgba(255, 215, 0, 0.1)', // Lighter gold
      cyan: 'rgba(0, 229, 255, 0.3)', // Cyan border
      subtle: 'rgba(148, 163, 184, 0.2)', // Subtle gray
    },
    
    // Glass effect overlays
    glass: {
      default: 'rgba(17, 17, 17, 0.8)',
      light: 'rgba(26, 31, 46, 0.6)',
      darker: 'rgba(11, 14, 23, 0.9)',
    },
  },

  // Typography - Refined with attention to hierarchy
  typography: {
    // Headings - Space Grotesk or Geometric sans-serif
    heading: {
      hero: {
        size: '72px', // 72px for H1 hero
        weight: 900,
        lineHeight: '1.1',
        letterSpacing: '-0.02em',
      },
      h1: {
        size: '56px',
        weight: 700,
        lineHeight: '1.2',
        letterSpacing: '-0.01em',
      },
      h2: {
        size: '40px',
        weight: 700,
        lineHeight: '1.3',
        letterSpacing: '-0.005em',
      },
      h3: {
        size: '28px',
        weight: 700,
        lineHeight: '1.4',
        letterSpacing: '0',
      },
      h4: {
        size: '20px',
        weight: 600,
        lineHeight: '1.5',
        letterSpacing: '0.01em',
      },
    },
    
    // Body - Inter or Manrope
    body: {
      large: {
        size: '18px',
        weight: 500,
        lineHeight: '1.6',
        letterSpacing: '0.005em',
      },
      regular: {
        size: '16px',
        weight: 400,
        lineHeight: '1.6',
        letterSpacing: '0.005em',
      },
      small: {
        size: '14px',
        weight: 400,
        lineHeight: '1.5',
        letterSpacing: '0.01em',
      },
      xs: {
        size: '12px',
        weight: 500,
        lineHeight: '1.4',
        letterSpacing: '0.02em',
      },
    },

    // Font families
    fonts: {
      heading: '"Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: '"Courier New", monospace',
    },
  },

  // Spacing Scale - Refined increments
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px',
    '5xl': '80px',
  },

  // Border Radius - Consistency
  borderRadius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },

  // Shadows - Depth layers
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 30px rgba(0, 229, 255, 0.3)',
    goldGlow: '0 0 20px rgba(255, 215, 0, 0.25)',
  },

  // Backdrop Filters
  backdrop: {
    blur: {
      sm: 'blur(4px)',
      md: 'blur(10px)',
      lg: 'blur(20px)',
      xl: 'blur(40px)',
    },
  },

  // Animations & Transitions
  transitions: {
    fast: '150ms',
    base: '250ms',
    slow: '350ms',
    slower: '500ms',
  },

  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 100,
    fixed: 400,
    modal: 500,
    popover: 600,
    tooltip: 700,
  },
};

// Export individual token categories for easy access
export const colors = designTokens.colors;
export const typography = designTokens.typography;
export const spacing = designTokens.spacing;
export const borderRadius = designTokens.borderRadius;
export const shadows = designTokens.shadows;
