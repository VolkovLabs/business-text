const webpack = require('webpack');

module.exports.getWebpackConfig = (config, options) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
    },
    fallback: {
      fs: false,
      util: false,
    },
  },
});
