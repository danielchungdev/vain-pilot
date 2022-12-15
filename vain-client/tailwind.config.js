/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        // Simple 8 row grid
        '8': 'repeat(8, minmax(100px, 1fr))',

        // Complex site-specific row configuration
        'layout': '200px minmax(900px, 1fr) 100px',
      }
    },
    fontFamily: {
      didot: ["didot", "sans-serif"]
    }
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@headlessui/tailwindcss')({ prefix: 'ui' })
  ],
}
