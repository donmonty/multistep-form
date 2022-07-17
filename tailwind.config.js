const defaultTheme = require('tailwindcss/defaultTheme');




module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'xs': '375px',
      ...defaultTheme.screens,
    },
  },
  // theme: {
  //   extend: {},
  // },
  plugins: [require("@tailwindcss/forms")],
}
