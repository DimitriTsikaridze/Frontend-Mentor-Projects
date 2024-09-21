/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'primary-100': '#635FC7',
        'primary-200': '#A8A4FF',
        'secondary-100': '#000112',
        'secondary-200': '#20212C',
        'secondary-300': '#2B2C37',
        'secondary-400': '#3E3F4E',
        'secondary-500': '#828FA3',
        'secondary-600': '#E4EBFA',
        'secondary-700': '#F4F7FD',
        'accent-100': '#EA5555',
        'accent-200': '#FF9898',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        'heading-xl': ['24px', { lineHeight: '30px' }],
        'heading-l': ['18px', { lineHeight: '23px' }],
        'heading-m': ['15px', { lineHeight: '19px' }],
        'heading-s': ['12px', { lineHeight: '15px', letterSpacing: '2.4px' }],
        'body-l': ['13px', { lineHeight: '23px' }],
        'body-m': ['12px', { lineHeight: '15px' }],
      },
      fontWeight: {
        medium: 500,
        bold: 700,
      },
    },
  },
  plugins: [],
};
