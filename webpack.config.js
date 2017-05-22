
const path = require('path')
const webpack = require('webpack')


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/src'),
    library: 'main',
    libraryTarget: 'var',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', ]
        }
      }
    ]
  },
}
