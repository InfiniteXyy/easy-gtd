module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poetsen: ['poetsen-one, sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-iconify').default(), require('tailwind-scrollbar-hide')],
  darkMode: 'class',
};
