/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0b0f13',
        'panel': '#0f1720',
        'muted': '#94a3b8'
      }
    },
  },
  plugins: [],
}
