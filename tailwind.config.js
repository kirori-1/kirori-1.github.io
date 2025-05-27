
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
    
  theme: {
    extend: {
      fontFamily: {
        sans: ["Atkinson", "sans-serif"],
      },
      colors: {
        primary: "rgb(34,41,57)",
        accent: "#2337ff",
        accentDark: "#000d8a",
        background: "#ffffff",
        gray: "rgb(96,115,159)",
        grayLight: "rgb(229,233,240)",
        grayDark: "rgb(34,41,57)",
      },
      boxShadow: {
        default:
          "0 2px 6px rgba(96,115,159,0.25), 0 8px 24px rgba(96,115,159,0.33), 0 16px 32px rgba(96,115,159,0.33)",
      },
      fontFamily: {
        sans: ['"Zen Maru Gothic"', "sans-serif"],
          },
      
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
