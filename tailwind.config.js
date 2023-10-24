/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        default: "1110px",
        login: "450px",
      },
      borderRadius: {
        default: "0.25rem",
        header_button: "2rem",
      },
      colors: {
        primary: "#4094F7",
        secondary: "#474747",
        button_hover: "#2267CF",
        white_hover : "#EEEEEE"
      },
      fontSize: {
        primarysize: '1rem',
        title: '1.5rem',
        subtitle: '0.9rem',
        title2: '1.2rem',
      },
      maxWidth: {
        primary: '1440px',
        login: '450px',
      }
    },
  },
  plugins: [],
};
