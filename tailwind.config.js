/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pitch: {
          black: '#07080B',
          dark: '#0D0F16',
          charcoal: '#13151F',
          surface: '#1A1D2B',
          card: '#11131C',
          red: '#FF2E4D',
          crimson: '#E11D48',
          amber: '#F59E0B',
          gold: '#EAB308',
          blue: '#2563EB',
          cyan: '#06B6D4',
          white: '#F5F5F7',
          gray: '#8E95A5',
          border: 'rgba(255, 255, 255, 0.08)',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'equalizer': 'equalizer 0.7s ease-in-out infinite alternate',
      },
      keyframes: {
        equalizer: {
          '0%': { height: '15%' },
          '100%': { height: '100%' },
        },
      },
    },
  },
  plugins: [],
};
