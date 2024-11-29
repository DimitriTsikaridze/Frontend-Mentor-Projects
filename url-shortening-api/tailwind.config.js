/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        dark: '#34313D',
        'dark-purple': '#3A3054',
        'light-purple': '#4B3F6B',
        gray: '#9E9AA8',
        'light-gray': '#EFF1F7',
        cyan: '2BD0D0',
      },
    },
  },
  plugins: [],
}
