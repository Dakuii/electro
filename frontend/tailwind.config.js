/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#06b6d4',  // Cyan 500
        //secondary: '', 
      },
    },
  },
  plugins: [],
};
