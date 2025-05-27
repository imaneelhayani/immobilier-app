module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 3,
      autoprefixer: { flexbox: 'no-2009' },
    }),
  ],
};
