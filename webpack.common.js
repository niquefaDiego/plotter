const path = require('path');

module.exports = {
  entry: './src/ts/main.ts',
  devtool: 'inline-source-map',
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
