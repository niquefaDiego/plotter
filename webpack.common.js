const path = require('path');

module.exports = {
  entry: './src/ts/main.ts',
  devtool: 'inline-source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
    stdin: true,
    poll: 1000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
              configFile: "tsconfig.dev.json"
          }
        }],
        exclude: '/node_modules'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
        include: '/data'
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js','css'],
  },
};
