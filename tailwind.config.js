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
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
