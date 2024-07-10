import {brandThemePlugin} from './brandThemePlugin.js';

module.exports = {
  darkMode: ['class'],
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  safelist: ['dark'],
  plugins: [brandThemePlugin],
};
