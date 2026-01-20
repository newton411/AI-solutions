import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Preserved legacy colors for backward compatibility
        dark: '#000000',
        darkGray: '#111111',
        gold: '#FFD700',
        darkGold: '#DAA520',
        
        // Enhanced cyan/blue theme
        'cyan-primary': '#00E5FF',
        'cyan-dark': '#00BFFF',
        'blue-primary': '#0F1629',
        'blue-secondary': '#1A1F2E',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      blur: {
        'xl': '40px',
      },
      backdropBlur: {
        'xl': '40px',
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(0, 229, 255, 0.3)',
        'glow-blue': '0 0 20px rgba(0, 191, 255, 0.3)',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        slideInLeft: 'slideInFromLeft 0.5s ease-out',
        slideInRight: 'slideInFromRight 0.5s ease-out',
        pulseGlow: 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 229, 255, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
