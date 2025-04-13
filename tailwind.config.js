/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'lavender': {
          50: '#f5f3ff',
          100: '#ede9fe',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Nunito', 'sans-serif'],
      },
      keyframes: {
        first: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(50px, 0px) scale(1.1)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        second: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(0px, 50px) scale(1.1)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        third: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(0px, -50px) scale(1.1)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        fourth: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(-50px, 0px) scale(1.1)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        fifth: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(50px, 50px) scale(1.1)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      animation: {
        first: "first 8s infinite",
        second: "second 8s infinite",
        third: "third 8s infinite",
        fourth: "fourth 8s infinite",
        fifth: "fifth 8s infinite",
      },
    },
  },
  plugins: [],
};