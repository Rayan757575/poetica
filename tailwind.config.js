/** @type {import('tailwindcss').Config} */
const { colors } = require('./src/shared/theme/colors');
const { fontFamily } = require('./src/shared/theme/typography');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ...colors,
        ...colors.notebookAccents, // habilita bg-terracotta, bg-sage, etc.
      },
      fontFamily: {
        regular: [fontFamily.brandRegular],
        medium: [fontFamily.brandMedium],
        semibold: [fontFamily.brandSemiBold],
        bold: [fontFamily.brandBold],
        reading: [fontFamily.reading],
        readingBold: [fontFamily.readingBold],
        ui: [fontFamily.ui],
        uiMedium: [fontFamily.uiMedium],
      },
    },
  },
  plugins: [],
};