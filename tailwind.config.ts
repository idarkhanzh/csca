import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f3f5fa',
          100: '#e6eaf3',
          200: '#c4cce0',
          300: '#9aa6c7',
          400: '#6677a6',
          500: '#3f5288',
          600: '#2c3d72',
          700: '#1e2c5a',
          800: '#172446',
          900: '#101a33',
          950: '#0a1126',
        },
        ink: {
          DEFAULT: '#0f172a',
          soft: '#1e293b',
          muted: '#475569',
          subtle: '#94a3b8',
        },
        surface: {
          DEFAULT: '#ffffff',
          alt: '#f8fafc',
          soft: '#f1f5f9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)',
        elevated: '0 8px 24px -8px rgba(15, 23, 42, 0.12), 0 4px 12px -4px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
