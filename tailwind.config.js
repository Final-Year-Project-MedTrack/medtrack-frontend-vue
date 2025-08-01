// tailwind.config.cjs
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
