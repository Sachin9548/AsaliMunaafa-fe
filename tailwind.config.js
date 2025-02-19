/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "576px",
      md: "768px",
      lg: "991px",
      xl: "1199px",
      xxl: "1440px",
      xxxl: "1640px",
    },

    extend: {
      colors: {
        white: "#fff",
        black: "#151515",
        dark: "#C0C6F4",
        darkText: "#5B638B",
        blue: "#7700D2",
        green: "#23DC9B",
        darkBlue: "#8E00BE",
        textColor: "#B391CC",
        lightPink: "#F4E7FF",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  // purge: [
  //   "./components/**/*.vue",
  //   "./layouts/**/*.vue",
  //   "./pages/**/*.vue",
  //   "./plugins/**/*.js",
  //   "./nuxt.config.js",
  // ],
};
