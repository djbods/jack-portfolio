import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Ink system (near-black, warm-tinted) ──────────────────────────
        ink: {
          DEFAULT: '#18171c',
          50:  '#f6f6f7',
          100: '#ebebed',
          200: '#d2d1d6',
          300: '#acabb2',
          400: '#797882',
          500: '#56555e',
          600: '#3e3d45',
          700: '#2e2d34',
          800: '#222129',
          900: '#18171c',
        },
        // ── Canvas (warm off-white backgrounds) ───────────────────────────
        canvas: {
          DEFAULT: '#f8f7f5',
          50:  '#fdfcfb',
          100: '#f8f7f5',
          200: '#f0ede9',
          300: '#e5e0da',
        },
        // ── Accent — electric violet-blue ─────────────────────────────────
        // Used sparingly: CTAs, active states, featured highlights, hover moments.
        // High contrast on both canvas and ink backgrounds.
        accent: {
          DEFAULT: '#5b4cf5',
          light:   '#7c6ff7',
          dim:     '#3d30d4',
          pale:    '#ede9fe',
          muted:   '#c4bdfb',
        },
      },

      fontFamily: {
        // Cabinet Grotesk — geometric, bold, confident
        display: ['"Cabinet Grotesk"', 'system-ui', 'sans-serif'],
        // DM Sans — clean, legible, friendly body copy
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        // DM Mono — code, labels, metadata
        mono:    ['"DM Mono"', 'monospace'],
      },

      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.03em',
        tight:    '-0.02em',
        snug:     '-0.01em',
      },

      animation: {
        'fade-up':   'fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':   'fadeIn 0.4s ease-out forwards',
        'blink':     'blink 1.1s step-end infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },

      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },

      boxShadow: {
        // For cards and elevated surfaces
        'card':    '0 1px 3px rgba(24,23,28,0.06), 0 4px 16px rgba(24,23,28,0.06)',
        'card-lg': '0 2px 8px rgba(24,23,28,0.08), 0 12px 40px rgba(24,23,28,0.08)',
        // Accent glow for interactive hover
        'accent':  '0 0 0 3px rgba(91,76,245,0.2)',
      },
    },
  },
  plugins: [],
}

export default config
