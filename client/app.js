import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
// import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import AppState from './store/app-state'
import App from './views/App'
// import Routes from './config/router'

const root = document.getElementById('root')

// ReactDOM.render(<App />, root)
// ReactDOM.hydrate(<App />, root)

const initialState = window.__INITIAL__STATE__ // eslint-disable-line

ReactDOM.render(
  <Provider appState={new AppState(initialState.appState)}>
    <Router>
      <App />
    </Router>
  </Provider>,
  root,
)

// const render = (Component) => {
//   ReactDOM.render(
//     <AppContainer>
//       <Provider appState={appState}>
//         <Router>
//           {/* <Component /> */}
//           <div>
//             <Component />
//             {/* <Route path="/" component={Component} /> */}
//             <Routes />
//           </div>
//         </Router>
//       </Provider>
//     </AppContainer>,
//     root,
//   )
// }
// render(App)
// if (module.hot) {
//   module.hot.accept('./views/App.jsx', () => {
//     const NextApp = require('./views/App').default // eslint-disable-line
//     render(NextApp)
//   })
// }
