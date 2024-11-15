/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"], // Ensure correct path to .ejs files
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss"), // Ensure Tailwind CSS is loaded as a plugin
    require("autoprefixer"), // Load Autoprefixer as a plugin
  ],
};
