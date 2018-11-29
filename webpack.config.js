const path = require('path');
const package = require('./package.json');

const config = {
  mode: "production",

  context: path.resolve(__dirname, 'src'),
  
  entry: "./index.tsx",

  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: package.name,
    libraryTarget:'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: [ ".js", ".jsx", ".ts", ".tsx" ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  }
};

module.exports = config;