// tailwind.config.cjs
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}",
    "./node_modules/@headlessui/vue/**/*.{js,ts}",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
