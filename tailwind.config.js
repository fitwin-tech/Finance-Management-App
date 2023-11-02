/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        default: "0.25rem",
        header_button: "2rem",
      },
      screens: {
        sm: "320px",
        md: "600px",
        lg: "1024px",
        xl: "1300px",
        xxl: "1700px",
        xxxl : "1800px",
      },
      colors: {
        primary: "#4094F7",
        secondary: "#474747",
        button_hover: "#2267CF",
        white_hover : "#EEEEEE",
        red : "#D31C1C",
        green : "#318015"
      },
      fontSize: {
        primarysize: '1rem',
        title: '1.5rem',
        subtitle: '0.9rem',
        title2: '1.1rem',
      },
      maxWidth: {
        primary: '1440px',
        login: '450px',
      }
    },
  },
  plugins: [],
};
