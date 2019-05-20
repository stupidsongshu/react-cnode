const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'
console.log('isDev************', isDev)

const config = merge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    // 将 publicPath 设为 /public/ (注意最后要加上斜线)是为了方便后面服务端渲染进行判断返回静态资源
    publicPath: '/public/'
  },
  // module: {
  //   rules: [
  //     {
  //       test: /.(js|jsx)$/,
  //       loader: 'eslint-loader',
  //       enforce: 'pre',
  //       exclude: [
  //         path.resolve(__dirname, '../node_modules')
  //       ]
  //     },
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
  // },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ]
})

if (isDev) {
  config.devServer = {
    // open: true,
    host: '0.0.0.0', // 默认 localhost
    port: '8888', // 默认 8080
    // 注意坑：如果磁盘上有编译后的 dist 目录, devServer 会优先使用磁盘上而导致问题，所以开发环境下需要删除 dist 目录
    contentBase: path.join(__dirname, '../dist'),
    hot: true, // 启用 webpack 的模块热替换特性
    overlay: {
      // warnings: true,
      errors: true
    },
    // 注意坑：这里的publicPath和entry里publicPath的值在最后需要加上斜线(如/public 要写成 /public/)，否则路径错误(可以打开开发者工具 Network 勾选上 Preserve log 查看路径)将导致热更新失效
    publicPath: '/public/',
    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
}

module.exports = config
