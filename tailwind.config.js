/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        primary: '#00E0FF',
        accent: '#34D399',
      },
      fontFamily: {
        main: ['Outfit', 'sans-serif'],
        display: ['Lexend', 'sans-serif'],
        drama: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        'pill': '500px',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    }
  }
}
