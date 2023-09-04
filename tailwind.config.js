/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        sans: ['var(--font-exo-2)', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
