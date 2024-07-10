import {shadcnPlugin} from './shadcnPlugin.js';

module.exports = {
  darkMode: ['class'],
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  safelist: ['dark'],
  plugins: [shadcnPlugin],
};
