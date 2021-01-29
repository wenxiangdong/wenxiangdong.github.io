// babel-plugin-macros.config.js
module.exports = {
  twin: {
    preset: 'styled-components',
    styled: {
      import: 'default',
      from: 'styled-components',
    },
    css: {
      import: 'css',
      from: 'styled-components',
    },
  },
}