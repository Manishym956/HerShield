/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Ensure paths are accurate
  theme: {
    extend: {
      colors: {
        'luxe-sapphire': '#0F3460',
        'luxe-onyx': '#3C3C3C',
        'luxe-ivory': '#F8F1F1',
        'luxe-emerald': '#3AB795',
        'luxe-gold': '#FFB703',
        'luxe-champagne': '#F6E8DC',
        'luxe-cream': '#FFE4C7',
      },
    },
  },
  plugins: [],
};
