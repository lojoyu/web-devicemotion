var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    // 'webpack-dev-server/client?http://localhost:8080',
    // 'webpack/hot/dev-server',
    './test/test.js'], 
  output: {
    path: path.join(__dirname, 'test'),
    filename: 'test.bundle.js'
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './test/index.html'
    })
  ],
  devServer: {
    //contentBase: './test',
    hot: true
  }
}