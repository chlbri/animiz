/** @type {import('tailwindcss/defaultTheme')} */
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
const tailwind = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      xxs: '350px',
      xs: '450px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        'family-overpass': ['overpass', ...defaultTheme.fontFamily.sans],
        'family-roboto': ['roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blue_black: '#152232',
        blue_bg: '#0a1622',
        blue_input: '#151f2e',
      },
    },
  },
  plugins: [],
};

module.exports = tailwind;
