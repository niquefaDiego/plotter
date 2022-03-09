const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
    stdin: true,
    poll: 1000,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
});
