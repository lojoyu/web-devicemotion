var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [path.join(__dirname,'src/index.js')], 
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.min.js',
    libraryTarget: 'commonjs2',
  },
  module: {
      rules: [{
          test: /\.js/,
          exclude: /(node_modules|bower_components)/,
          use: [{
              loader: 'babel-loader'
          }]
      }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  optimization: {
    minimize: true
  },
  resolve: {
    extensions: ['.js'],
  },
}