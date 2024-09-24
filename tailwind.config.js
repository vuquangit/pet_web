/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./public/index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      flex: {
        'auto-0': '0 0 auto',
        '0-0-80': '0 0 80px',
      },
      colors: {
        'icon-light': '#f5f5f5',
        'icon-dark': '#000000',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
