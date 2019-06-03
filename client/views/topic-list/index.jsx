import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Button from '@material-ui/core/Button'
import AppState from '../../store/app-state'

@inject('appState') @observer
class TopicList extends React.Component {
  // componentDidMount() {
  //   setInterval(() => {
  //     this.props.appState.add()
  //   }, 1000)
  // }

  handleChange = (e) => {
    // this.props.appState.name = e.target.value
    this.props.appState.changeName(e.target.value)
  }

  asyncBootstrap() {
    console.log('客户端调用 asyncBootstrap------') // eslint-disable-line
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          this.props.appState.count = 3
          resolve(true)
        }, 1000);
      } catch (error) {
        reject(error)
      }
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Topic List</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Button variant="contained" color="primary">This is a Button</Button>
        <input type="text" onChange={this.handleChange} />
        {this.props.appState.msg}
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}

export default TopicList
