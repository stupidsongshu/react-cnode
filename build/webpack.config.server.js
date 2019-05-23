const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const config = merge(baseConfig, {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // module: {
  //   rules: [
  //     {
  //       test: /.jsx$/,
  //       loader: 'babel-loader'
  //     },
  //     {
  //       test: /.js$/,
  //       loader: 'babel-loader',
  //       exclude: [
  //         path.join(__dirname, '../node_modules')
  //       ]
  //     }
  //   ]
  // }
})

module.exports = config
