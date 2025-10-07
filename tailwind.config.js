const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Atkinson",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: ["Atkinson", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "rgb(34,41,57)",
        accent: "#2337ff",
        accentDark: "#000d8a",
        background: "#ffffff",
        customGray: "rgb(96,115,159)",
        customGrayLight: "rgb(229,233,240)",
        customGrayDark: "rgb(34,41,57)",
        gray: colors.gray,
      },
      boxShadow: {
        default:
          "0 2px 6px rgba(96,115,159,0.25), 0 8px 24px rgba(96,115,159,0.33), 0 16px 32px rgba(96,115,159,0.33)",
        glow: "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      fontFamily: {
        sans: ['"Zen Maru Gothic"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
