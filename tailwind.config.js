/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"], // Ensures Tailwind scans all .ejs files in the views folder and subfolders
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss"), // Ensure Tailwind CSS is loaded as a plugin
    require("autoprefixer"), // Load Autoprefixer as a plugin
  ],
};
