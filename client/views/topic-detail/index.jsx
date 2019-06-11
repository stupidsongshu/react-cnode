import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import marked from 'marked'
import { observer, inject } from 'mobx-react'

import { withStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
// import Button from '@material-ui/core/Button'
// import IocnReply from '@material-ui/icons/Reply'
import CircularProgress from '@material-ui/core/CircularProgress'

import Container from '../layout/container'
import Reply from './reply'

import { topicDetailStyle } from './style'

@inject(stores => ({
  appState: stores.appState,
  topicStore: stores.topicStore,
})) @observer
class TopicDetail extends React.Component {
  componentDidMount() {
    console.log(this.props.appState)

    const id = this.getTopicId()
    this.props.topicStore.fetchTopicDetail(id)
  }

  getTopicId() {
    return this.props.match.params.id
  }

  getTopicDetail() {
    const id = this.getTopicId()
    return this.props.topicStore.detailsMap[id]
  }

  render() {
    const topic = this.getTopicDetail()
    const { classes } = this.props

    if (!topic) {
      return (
        <Container>
          <section>
            <CircularProgress />
          </section>
        </Container>
      )
    }

    return (
      <div>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header}>
            <h3>{topic.title}</h3>
          </header>
          <section className={classes.body}>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>

        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>{`${topic.reply_count}回复`}</span>
            <span>{`最新回复 ${topic.last_reply_at}`}</span>
          </header>
          <section>
            {
              topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
            }
          </section>
        </Paper>
      </div>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  topicStore: PropTypes.object.isRequired,
}
TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(topicDetailStyle)(TopicDetail)
