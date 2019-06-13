import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import dateformat from 'dateformat'

import { withStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import UserWrapper from './user'
import userInfoStyles from './styles/user-info-style'

const TopicItem = ({ topic, onClick }) => (
  <ListItem button onClick={onClick}>
    <Avatar src={topic.author.avatar_url} />
    <ListItemText
      primary={topic.title}
      secondary={`最新回复：${dateformat(topic.last_reply_at, 'yyyy年mm月dd日 hh时MM分ss秒')}`}
    />
  </ListItem>
)

@inject(stores => ({
  appState: stores.appState,
  user: stores.appState.user,
})) @observer
class UserInfo extends React.Component {
  componentWillMount() {
    if (!this.props.user.isLogin) {
      this.props.history.replace('/user/login')
      return
    }
    this.props.appState.getUserDetail()
    this.props.appState.getUserCollection()
  }

  gotoDetail = (id) => {
    this.props.history.push(`/detail/${id}`)
  }

  render() {
    const { classes } = this.props
    const topics = this.props.user.detail.recentTopics
    const replies = this.props.user.detail.recentReplies
    const collections = this.props.user.collection.list

    return (
      <UserWrapper>
        <Grid container spacing={1}>
          <Grid item md={4} xs={12}>
            <Paper elevation={2}>
              <Typography className={classes.partTitle}>
                <span>最近发布的话题</span>
              </Typography>
              <List>
                {
                  topics.length > 0
                    ? topics.map(topic => (
                      <TopicItem
                        topic={topic}
                        onClick={() => this.gotoDetail(topic.id)}
                        key={topic.id}
                      />
                    ))
                    : <Typography align="center">最近没有发布过话题</Typography>
                }
              </List>
            </Paper>
          </Grid>

          <Grid item md={4} xs={12}>
            <Paper elevation={2}>
              <Typography className={classes.partTitle}>
                <span>新的回复</span>
              </Typography>
              <List>
                {
                  replies.length > 0
                    ? replies.map(topic => (
                      <TopicItem
                        topic={topic}
                        onClick={() => this.gotoDetail(topic.id)}
                        key={topic.id}
                      />
                    ))
                    : <Typography align="center">最近没有新的回复</Typography>
                }
              </List>
            </Paper>
          </Grid>

          <Grid item md={4} xs={12}>
            <Paper elevation={2}>
              <Typography className={classes.partTitle}>
                <span>收藏的话题</span>
              </Typography>
              <List>
                {
                  collections.length > 0
                    ? collections.map(topic => (
                      <TopicItem
                        topic={topic}
                        onClick={() => this.gotoDetail(topic.id)}
                        key={topic.id}
                      />
                    ))
                    : <Typography align="center">还没有收藏话题哦</Typography>
                }
              </List>
            </Paper>
          </Grid>
        </Grid>
      </UserWrapper>
    )
  }
}

UserInfo.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

TopicItem.propTypes = {
  topic: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default withStyles(userInfoStyles)(UserInfo)
