/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include all app router files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
