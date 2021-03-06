module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('tailwindcss-iconify').default(), require('tailwind-scrollbar-hide')],
  darkMode: 'class',
};
