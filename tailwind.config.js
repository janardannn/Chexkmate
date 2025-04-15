import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "small-mobile-text": { 'max': '450px' },
        "mobile-text": { 'min': '460px', 'max': '700px' },
        "mobile": { 'max': '900px' },
        "not-mobile": { 'min': '901px' },
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", ...defaultTheme.fontFamily.sans],
        paytone: ["var(--font-paytone)", "sans-serif"],
        geist: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
        geistMono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};

export default config;
