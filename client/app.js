import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
// import { AppContainer } from 'react-hot-loader' // eslint-disable-line
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { lightBlue, pink } from '@material-ui/core/colors'
import AppState from './store/app-state'
import App from './views/App'
// import Routes from './config/router'

const root = document.getElementById('root')

// ReactDOM.render(<App />, root)
// ReactDOM.hydrate(<App />, root)

const initialState = window.__INITIAL__STATE__ || {} // eslint-disable-line

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    // accent: pink,
    secondary: pink,
    type: 'light',
  },
})

// ReactDOM.hydrate(
//   <Provider appState={new AppState(initialState.appState)}>
//     <Router>
//       <ThemeProvider theme={theme}>
//         <App />
//       </ThemeProvider>
//     </Router>
//   </Provider>,
//   root,
// )

class CreateApp extends React.Component {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    return (
      <Provider appState={new AppState(initialState.appState)}>
        <Router>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.hydrate(
  <CreateApp />,
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
