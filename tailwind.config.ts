import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep black backgrounds
        void: {
          DEFAULT: '#07070f',
          100: '#0d0d1a',
          200: '#111122',
          300: '#16162e',
        },
        // Amber accent system
        amber: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Warm white text
        warm: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      },
      fontFamily: {
        display:  ['Syne', 'sans-serif'],
        body:     ['DM Sans', 'sans-serif'],
        mono:     ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'circuit': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23f59e0b' stroke-width='0.3' stroke-opacity='0.06'%3E%3Cpath d='M0 30h60M30 0v60M0 15h15v15M45 0v15h15M45 45h15v15M0 45h15v15'/%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='0'  cy='30' r='1.5'/%3E%3Ccircle cx='60' cy='30' r='1.5'/%3E%3Ccircle cx='30' cy='0'  r='1.5'/%3E%3Ccircle cx='30' cy='60' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'grid-amber': "linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      boxShadow: {
        'amber-sm':  '0 0 10px rgba(245,158,11,0.2)',
        'amber':     '0 0 20px rgba(245,158,11,0.3)',
        'amber-lg':  '0 0 40px rgba(245,158,11,0.4)',
        'amber-xl':  '0 0 60px rgba(245,158,11,0.5)',
        'glass':     '0 8px 32px rgba(0,0,0,0.4)',
        'glass-lg':  '0 16px 64px rgba(0,0,0,0.5)',
      },
      animation: {
        'pulse-amber':   'pulseAmber 2s ease-in-out infinite',
        'float':         'float 6s ease-in-out infinite',
        'scan-line':     'scanLine 4s linear infinite',
        'glitch':        'glitch 3s step-end infinite',
        'blink':         'blink 1s step-end infinite',
        'data-flow':     'dataFlow 2s linear infinite',
      },
      keyframes: {
        pulseAmber: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(245,158,11,0.2)' },
          '50%':      { boxShadow: '0 0 30px rgba(245,158,11,0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%':      { transform: 'translate(-2px, 1px)' },
          '40%':      { transform: 'translate(2px, -1px)' },
          '60%':      { transform: 'translate(-1px, 2px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        dataFlow: {
          '0%':   { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
