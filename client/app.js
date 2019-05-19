import React from 'react'
import ReactDOM from 'react-dom'
// import { AppContainer } from 'react-hot-loader'
import App from './App.jsx'

ReactDOM.render(<App />, document.getElementById('root'))
// ReactDOM.hydrate(<App />, document.getElementById('root'))

/**
 * react 开发环境热更新配置
 * .babelrc plugins 加入 react-hot-loader/babel
 * webpack.config.client.js
 */
// const root = document.getElementById('root')
// const render = Component => {
//   ReactDOM.render(
//     <AppContainer>
//       <Component></Component>
//     </AppContainer>,
//     root
//   )
// }

// render(App);

// // webpack Hot Module Replacement API
// if (module.hot) {
//   console.log(module)
//   module.hot.accept('./App.jsx', () => {
//     const NextApp = require('./App.jsx')
//     render(App)
//     render(NextApp)
//   })
// }
