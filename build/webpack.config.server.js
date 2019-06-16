const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'
console.log('process.env.NODE_ENV************', process.env.NODE_ENV)
console.log('isDev************', isDev)
console.log('isPro************', process.env.NODE_ENV === 'production')

const config = merge(baseConfig, {
  target: 'node',
  mode: 'production',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2'
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          'isomorphic-style-loader', // ssr
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BASE': '"http://127.0.0.1:9999"'
    })
  ]
})

if (isDev) {
  config.mode = 'development'
}

module.exports = config
