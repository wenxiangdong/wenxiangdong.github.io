module.exports = {
  purge: ['./src/**/**/*.{js,jsx,ts,tsx}', './src/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        'primary': '#515a6e',
        'secondary': '#C9C9C9',
        'primary-light': '#ffffff',
        'secondary-light': '#c7c9d3'
      }
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
