import React from 'react'
import { hot } from 'react-hot-loader' // eslint-disable-line
// import { Link } from 'react-router-dom'
import Routes from '../config/router'
import AppBar from './layout/app-bar'

class App extends React.Component {
  componentDidMount() {
    // TODO
  }

  render() {
    return [
      // <div key="banner">
      //   <Link to="/">首页</Link>
      //   <Link to="/detail">详情页</Link>
      // </div>,
      <AppBar key="app-bar" />,
      <Routes key="routes" />,
    ]
  }
}

export default hot(module)(App)
