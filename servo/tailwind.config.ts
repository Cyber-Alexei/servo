import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maincolor: "#c834ff",
        secondarycolor: "#ae2cde",
        textcolor1: "#ffffff",
        textcolor2: "#000000",
      },
    },
  },
  plugins: [],
} satisfies Config;
