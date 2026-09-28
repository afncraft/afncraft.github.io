/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#fdfcf9',
          100: '#faf8f1',
          200: '#f5f1e6',
          300: '#efe9d8',
          400: '#e5dcc6',
          500: '#d4c7a8',
        },
        forest: {
          50: '#f0f5f1',
          100: '#dce8e1',
          200: '#b8d0c3',
          300: '#8ab299',
          400: '#5a8a6e',
          500: '#3a6b50',
          600: '#2a5238',
          700: '#1e3f29',
          800: '#162d20',
          900: '#0f1f16',
        },
        gold: {
          50: '#fbf7ee',
          100: '#f5ecd5',
          200: '#ead9ab',
          300: '#ddc07a',
          400: '#d4a855',
          500: '#c6903a',
          600: '#a8752e',
          700: '#865b27',
          800: '#6b4720',
          900: '#4d3216',
        },
        charcoal: {
          50: '#f6f6f5',
          100: '#e2e2e0',
          200: '#c4c4c1',
          300: '#9e9e9a',
          400: '#72726e',
          500: '#525250',
          600: '#3a3a38',
          700: '#2a2a28',
          800: '#1c1c1b',
          900: '#121211',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
