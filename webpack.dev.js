const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/,
    stdin: true,
    poll: 1000,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/dev'),
  },
  plugins: [
    new BundleAnalyzerPlugin(),
  ]
});
