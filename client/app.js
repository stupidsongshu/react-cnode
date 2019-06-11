import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
// import { AppContainer } from 'react-hot-loader' // eslint-disable-line
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { lightBlue, pink } from '@material-ui/core/colors'
import { AppState, TopicStore } from './store/store'
import App from './views/App'

const root = document.getElementById('root')

// ReactDOM.render(<App />, root)
// ReactDOM.hydrate(<App />, root)

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    // accent: pink,
    secondary: pink,
    type: 'light',
  },
})

const createApp = (TheApp) => {
  class Main extends React.Component {
    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles) {
        jssStyles.parentNode.removeChild(jssStyles)
      }
    }

    render() {
      return <TheApp />
    }
  }
  return Main
}

const CreateApp = createApp(App)

const initialState = window.__INITIAL__STATE__ || {} // eslint-disable-line
const appState = new AppState(initialState.appState)
const topicStore = new TopicStore(initialState.topicStore)

ReactDOM.render(
  <Provider appState={appState} topicStore={topicStore}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CreateApp />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  root,
)

// const render = (Component) => {
//   ReactDOM.render(
//     <AppContainer>
//       <Provider appState={appState}>
//         <Router>
//           <Component />
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
