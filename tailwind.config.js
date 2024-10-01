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
        'light-100': '#efefef', // rgb(239, 239, 239)
        'light-200': '#737373', // rgb(115, 115, 115)
        'light-300': '#dbdbdb', // rgb(219, 219, 219)
        'dark-100': '#262626', // rgb(38, 38, 38)
        'dark-200': '#a8a8a8', // rgb(168, 168, 168)
        'dark-300': '#000000',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
