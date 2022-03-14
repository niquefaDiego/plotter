const glob = require('glob-all');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const whitelister = require('purgecss-whitelister');

// do not remove unused css from this file
const cssWhitelist = whitelister('node_modules/codemirror/lib/codemirror.css');

module.exports = {
  entry: './src/ts/main.ts',
  devtool: 'inline-source-map',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
              configFile: "tsconfig.dev.json"
          },
        }],
        exclude: '/node_modules'
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, "node_modules/codemirror")],
        use: ["style-loader", "css-loader"]
      },
      {
        test:  /\.(scss)$/,
        use: [ {
          loader: MiniCssExtractPlugin.loader,  // TODO: use "style-loader" for development
        }, {
          loader: 'css-loader' // translates CSS into CommonJS modules
        }, {
          // Run postcss actions
          loader: 'postcss-loader',
          options: {
            // `postcssOptions` is needed for postcss 8.x;
            // if you use postcss 7.x skip the key
            postcssOptions: {
              // postcss plugins, can be exported to postcss.config.js
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }
        }, {
          // compiles Sass to CSS
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
        include: '/data'
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js','css'],
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'src/html/index.html'}),
    new MiniCssExtractPlugin({  // TODO: use "style-loader" for development (remove this line)
      filename: "[name].css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(["src/html/*"], { nodir: true }),
      safelist: cssWhitelist
    }),
  ],
};
