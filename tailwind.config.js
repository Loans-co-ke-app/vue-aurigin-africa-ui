/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,js,jsx,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        primary: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif'
        ],
        
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
