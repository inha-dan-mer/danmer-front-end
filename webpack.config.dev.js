const { merge } = require('webpack-merge');
const { DefinePlugin } = require('webpack');
const common = require('./webpack.config.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: 9000,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(
        require('dotenv').config({ path: './.env.development' }).parsed
      ),
    }),
  ],
});
