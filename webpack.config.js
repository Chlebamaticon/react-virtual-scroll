const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const package = require('./package.json');

const IS_PROD = process.env.NODE_ENV === 'production';

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: path.join(__dirname, 'src', 'index.jsx'),
  },
  mode: IS_PROD ? 'production': 'development',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: package.name,
    libraryTarget:'umd'
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
      }
    }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['lib'])
  ]
};

module.exports = config;