import React from 'react'
import { hot } from 'react-hot-loader' // eslint-disable-line
import { Link } from 'react-router-dom'
import Routes from '../config/router'

class App extends React.Component {
  componentDidMount() {
    // TODO
  }

  render() {
    return [
      <div>
        <Link to="/">首页</Link>
        <Link to="/detail">详情页</Link>
      </div>,
      <Routes />,
    ]
  }
}

export default hot(module)(App)
