import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import dateformat from 'dateformat'

import { withStyles } from '@material-ui/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

import { tabs } from '../../util/variable-define'

import { topicPrimaryStyle, topicSecondaryStyle } from './style'

const Primary = ({ topic, classes }) => {
  const classnames = cx({
    [classes.tab]: true,
    [classes.top]: topic.top,
  })
  return (
    <div className={classes.root}>
      <span className={classnames}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  )
}

const Secondary = ({ topic, classes }) => (
  <span className={classes.root}>
    <span className={classes.username}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span className={classes.secondaryColor}>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>
      创建时间：
      {dateformat(topic.create_at, 'yyyy年mm月dd日 hh:MM:ss')}
    </span>
  </span>
)

const StyledPrimary = withStyles(topicPrimaryStyle)(Primary)
const StyledSecondary = withStyles(topicSecondaryStyle)(Secondary)

const TopiclistItem = ({ topic, onClick }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url} />
    </ListItemAvatar>
    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecondary topic={topic} />}
    />
  </ListItem>
)

Primary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}
Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}
TopiclistItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
}

export default TopiclistItem
