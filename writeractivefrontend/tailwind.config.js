/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
      './pages/*'
  ],
  theme: {
    extend: {
      colors: {
        'background-color': "#ebedf4",
        'light-color':"#a7ff83",
        'accent-color':"#17b978",
        'main-color':"#01baef",
        'hover-color':"#0496C0",
        'main-dark-color':"#2c363f",
        "light":"#bdbdbd",
        "end-gradient-color": "#007ed9"
      }
    },
  },
  plugins: [],
}
