/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B5BAFF',
          hover: '#9EA5FF',
        },
        'cobalt': '#B5BAFF',
        'cobalt-deep': '#9EA5FF',
        secondary: '#AEE2FF',
        accent: '#D9F9DF',
        background: '#FFFFFF',
        ink: {
          deep: '#1C1E21',
          DEFAULT: '#1F2937',
        },
        hairline: {
          DEFAULT: '#ced0d4',
          soft: '#dee3e9',
        },
        critical: {
          DEFAULT: '#e41e3f',
          strong: '#f0284a',
        },
        fb: {
          blue: '#1876f2',
        }
      },
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
