/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d0bcff",
        accent: "#ccc2dc",
        warning: "#f2b8b5"
      },
    },
  },
  plugins: [],
}
