/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      borderRadius: {
        'xl': '16px',
        'xxl': '24px',
        'xxxl': '32px',
        'full': '100px',
      },
      spacing: {
        'base': '16px',
        'xxl': '32px',
        'xxxl': '40px',
      },
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
