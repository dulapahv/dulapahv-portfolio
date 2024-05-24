import type { Config } from "tailwindcss";

const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fb568a",
        secondary: "#34dcdd",
        RED: {
          DEFAULT: "#fb568a",
          100: "#fde2e8",
          200: "#fbb6c9",
          300: "#fb8aa9",
          400: "#fb5d8a",
          500: "#fb568a",
          600: "#fb4e7a",
          700: "#fb4469",
          800: "#fb3b59",
          900: "#fb3148",
        },
        YELLOW: {
          DEFAULT: "#fbcd50",
          100: "#fef8e2",
          200: "#fdf1c5",
          300: "#fceaa8",
          400: "#fce38b",
          500: "#fbcd50",
          600: "#f9b84b",
          700: "#f7a346",
          800: "#f58e41",
          900: "#f37a3c",
        },
        BLUE: {
          DEFAULT: "#34dcdd",
          100: "#e6fafa",
          200: "#bfeff0",
          300: "#99e5e6",
          400: "#73dbdc",
          500: "#34dcdd",
          600: "#2fb8c8",
          700: "#2a94b3",
          800: "#25709e",
          900: "#205c89",
        },
        PURPLE: {
          DEFAULT: "#965efd",
          100: "#f0e9fc",
          200: "#d5c9f9",
          300: "#baa8f6",
          400: "#9f88f3",
          500: "#965efd",
          600: "#7c4de9",
          700: "#623cd5",
          800: "#482bc1",
          900: "#2e1aae",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
