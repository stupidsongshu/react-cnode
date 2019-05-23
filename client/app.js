import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import appState from './store/app-state'
import App from './views/App'

const root = document.getElementById('root')

// ReactDOM.render(<App />, root)
// ReactDOM.hydrate(<App />, root)

ReactDOM.hydrate(
  <Provider appState={appState}>
    <Router>
      <App />
    </Router>
  </Provider>,
  root,
)
