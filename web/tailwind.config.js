/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#a78bfa',
          dark: '#7c3aed',
          light: '#c4b5fd',
        },
        surface: {
          DEFAULT: '#1e1e3f',
          dark: '#0f0f0f',
          card: '#16163a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #a78bfa, #60a5fa)',
      },
    },
  },
  plugins: [],
}


