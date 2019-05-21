import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './views/App'

const root = document.getElementById('root')

// ReactDOM.render(<App />, document.getElementById('root'))
// ReactDOM.hydrate(<App />, document.getElementById('root'))

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  root,
)
