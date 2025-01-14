import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        default: "#1ea69a",
        light: "#77e6dd",
        dark: "#0b8278",
      },
      fontFamily: {
        inter: ["Inter", "serif"],
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [daisyui],
};
