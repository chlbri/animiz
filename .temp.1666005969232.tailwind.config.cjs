/** @type {import('tailwindcss/defaultTheme')} */
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'family-overpass': ['overpass', ...defaultTheme.fontFamily.sans],
        'family-roboto': ['roboto', ...defaultTheme.fontFamily.sans],
      },
      colors:{
        bl
      }
    },
  },
  plugins: [],
};
