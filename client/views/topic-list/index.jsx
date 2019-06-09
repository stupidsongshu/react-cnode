import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import queryString from 'query-string'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'

import { AppState } from '../../store/store'
import Container from '../layout/container'
import TopicListItem from './list-item'
import { tabs } from '../../util/variable-define'

@inject(stores => ({
  appState: stores.appState,
  topicStore: stores.topicStore,
})) @observer
class TopicList extends React.Component {
  // static contextTypes = {
  //   router: PropTypes.object,
  // }

  componentDidMount() {
    // setInterval(() => {
    //   this.props.appState.add()
    // }, 1000)

    const queryTab = this.getQueryTab()
    this.props.topicStore.fetchTopics(queryTab)
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.location.search !== this.props.location.props) {
      const queryTab = this.getQueryTab(nextProp.location.search)
      this.props.topicStore.fetchTopics(queryTab)
    }
  }

  // handleChange = (e) => {
  //   // this.props.appState.name = e.target.value
  //   this.props.appState.changeName(e.target.value)
  // }

  getQueryTab(search) {
    search = search || this.props.location.search
    const query = queryString.parse(search)
    return query.tab || 'all'
  }

  changeTab = (e, value) => {
    // console.log(this.context.router) // undefined
    // this.context.router.history.push({
    //   pathname: '/index',
    //   search: `?tab=${value}`,
    // })
    this.props.history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    })
    // this.props.history.push(`/list?tab=${value}`)
  }

  detail = (e) => {
    console.log(e) // eslint-disable-line
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
    const {
      topicStore,
    } = this.props

    const topicList = topicStore.topics
    const syncingTopics = topicStore.syncing

    const queryTab = this.getQueryTab()

    return (
      <Container>
        <Helmet>
          <title>Topic List</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Tabs value={queryTab} onChange={this.changeTab} indicatorColor="primary" textColor="primary" scrollButtons="auto" variant="scrollable">
          {
            Object.keys(tabs).map(key => (
              <Tab key={key} label={tabs[key]} value={key} />
            ))
          }
        </Tabs>
        <List>
          {
            topicList.map(topic => (
              <TopicListItem
                key={topic.id}
                topic={topic}
                onClick={this.detail}
              />
            ))
          }
        </List>
        {
          syncingTopics ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '40px 0',
              }}
            >
              <CircularProgress />
            </div>
          ) : null
        }
        {/* <input type="text" onChange={this.handleChange} />
        {this.props.appState.msg} */}
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
  topicStore: PropTypes.object.isRequired,
}

TopicList.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default TopicList
