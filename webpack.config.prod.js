const path = require('path');
const { merge } = require('webpack-merge');
const { DefinePlugin } = require('webpack');
const common = require('./webpack.config.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(require('dotenv').config({ path: './.env.production' }).parsed),
    }),
  ],
});
