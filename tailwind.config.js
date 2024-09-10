/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '500': '500px',
      },
      height: {
        '600' : '600px',
      }
    },
  },
  plugins: [],
}

