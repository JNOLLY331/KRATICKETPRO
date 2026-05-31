/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C8102E',
          dark: '#A50D26',
          light: '#F8D7DB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card': '0 2px 8px 0 rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 24px 0 rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s ease both',
        'fade-in': 'fadeIn 0.3s ease both',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
