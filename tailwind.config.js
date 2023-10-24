/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: { "": "#4D4C7D", dark: "#363062", light: "#7774cf" },
      secondary: "#F99417",
    },

    extend: {},
  },
  plugins: [require("daisyui")],
};
