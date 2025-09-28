/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d9ecff",
          200: "#bfe0ff",
          300: "#99cfff",
          400: "#63b5ff",
          500: "#2a94ff",
          600: "#0c77e6",
          700: "#055db8",
          800: "#084e93",
          900: "#0c4378"
        }
      }
    }
  },
  plugins: []
};