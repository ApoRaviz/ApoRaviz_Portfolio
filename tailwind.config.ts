import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B00',
        'primary-light': '#FF8C00',
        dark: '#0a0a0a',
        'dark-card': '#111111',
        'dark-border': '#1a1a1a',
      },
      fontFamily: {
        display: ['Fredoka', 'Space Grotesk', 'sans-serif'],
        body: ['Nunito', 'DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(255,107,0,0.4)',
        'glow-lg': '0 0 40px rgba(255,107,0,0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config;
