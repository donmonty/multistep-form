const defaultTheme = require('tailwindcss/defaultTheme');




module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        figGray: {
          100: "#FAFAFA",
          200: "#F7F7F7",
          300: "#E3E3E3",
          400: "#E6E5EC",
          500: "#A7ABB6",
          600: "#74777F",
          700: "#596272",
          800: "#3C3C3F",
          900: "#1D1D1E",
        },
        figBlue: {
          900: "#0E1B42",
        },
        figOrange: {
          500: "#E46A56",
          700: "#E74D33"
        },
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        CapriSans: ['"Capri Sans"', "sans-serif"],
        Playfair: ["Playfair\\ Display", "serif"],
      }
    },
    screens: {
      'xs': '375px',
      ...defaultTheme.screens,
    },
  },
  
  plugins: [require("@tailwindcss/forms")],
}
