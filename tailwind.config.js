/** @type {import('tailwindcss').Config} */

//const defaultConfig = require('tailwindcss/defaultConfig');

module.exports = {
  content: ['./src/**/*.njk', './src/**/*.md'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
