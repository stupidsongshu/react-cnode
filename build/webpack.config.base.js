const path = require('path')

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    // 将 publicPath 设为 /public/ (注意最后要加上斜线)是为了方便后面服务端渲染区分URL是静态资源还是API请求
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      // React-Hot-Loader: react-🔥-dom patch is not detected. React 16.6+ features may not work.
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      }
    ]
  }
}
