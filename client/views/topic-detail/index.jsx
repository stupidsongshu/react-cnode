import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import marked from 'marked'
import { observer, inject } from 'mobx-react'
import dateformat from 'dateformat'
import SimpleMDE from 'react-simplemde-editor'

import { withStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import IocnReply from '@material-ui/icons/Reply'
import CircularProgress from '@material-ui/core/CircularProgress'

import 'easymde/dist/easymde.min.css'

import Container from '../layout/container'
import Reply from './reply'

import { topicDetailStyle } from './styles'

@inject(stores => ({
  appState: stores.appState,
  topicStore: stores.topicStore,
})) @observer
class TopicDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      mdeValue: '',
    }
  }

  componentDidMount() {
    const id = this.getTopicId()
    this.props.topicStore.fetchTopicDetail(id)
  }

  getTopicId = () => this.props.match.params.id

  getTopicDetail = () => {
    const id = this.getTopicId()
    return this.props.topicStore.detailsMap[id]
  }

  handleMDEChange = (value) => {
    this.setState({
      mdeValue: value,
    })
  }

  login = () => {
    this.props.history.push('/user/login')
  }

  doReply = () => {
    const topic = this.getTopicDetail()
    topic.doReply(this.state.mdeValue).then(() => {
      this.setState({
        mdeValue: '',
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  render() {
    const topic = this.getTopicDetail()
    const { classes } = this.props
    const { user } = this.props.appState

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

        {
          topic.createReplies && topic.createReplies.length > 0
            ? (
              <Paper elevation={4} className={classes.replies}>
                <header className={classes.replyHeader}>
                  <span>我的最新回复</span>
                  <span>{`${topic.createReplies.length}条`}</span>
                </header>
                {
                  topic.createReplies.map(reply => (
                    <Reply
                      key={reply.id}
                      reply={Object.assign({}, reply, {
                        author: {
                          avatar_url: user.info.avatar_url,
                          loginname: user.info.loginname,
                        },
                      })}
                    />
                  ))
                }
              </Paper>
            ) : null
        }

        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>{`${topic.reply_count}回复`}</span>
            <span>{`最新回复 ${dateformat(topic.last_reply_at)}`}</span>
          </header>
          {
            user.isLogin
              ? (
                <section className={classes.replyEditor}>
                  <SimpleMDE
                    onChange={this.handleMDEChange}
                    value={this.state.mdeValue}
                    options={{
                      placeholder: '请输入您的回复内容',
                      spellChecker: false,
                    }}
                  />
                  <Button
                    color="primary"
                    className={classes.replyButton}
                    onClick={this.doReply}
                  >
                    <IocnReply />
                  </Button>
                </section>
              )
              : (
                <section className={classes.notLoginButton}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.login}
                  >
                    登录进行回复
                  </Button>
                </section>
              )
          }
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
  history: PropTypes.object.isRequired,
}

export default withStyles(topicDetailStyle)(TopicDetail)
