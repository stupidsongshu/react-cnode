import React from 'react'
import axios from 'axios'

/* eslint-disable */
export default class ApiTest extends React.Component {
  /**
   * readyState
   * DONE: 4
    HEADERS_RECEIVED: 2
    LOADING: 3
    OPENED: 1
    UNSENT: 0
   */
  getTopics = () => {
    axios.get('/api/topics').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  login = () => {
    axios.post('/api/user/login', {
      accessToken: '18aa79ea-7af3-41f2-a2fc-241c93e888df'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  markAll = () => {
    axios.post('/api/message/mark_all?needAccessToken=true').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    )
  }
}
/* eslint-enable */
