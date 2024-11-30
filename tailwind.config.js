/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Path to your files
  ],
  theme: {
    extend: {
      colors: {
        "custom-border": "#80D4CC",
      },
    },
  },
  plugins: [],
};
