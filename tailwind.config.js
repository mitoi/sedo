module.exports = {
  prefix: '',
  purge: {
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        '1/2': '50%'
      }
    },
  },
  variants: {
    extend: {},
  },
};
