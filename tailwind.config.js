/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",
        secondary: "#283046",
        accent: "#f6993f",
        danger: "#e3342f",
        success: "#38c172",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
