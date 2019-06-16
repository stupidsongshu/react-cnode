import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import dateformat from 'dateformat'
import { withStyles } from '@material-ui/styles'
import { Avatar } from '@material-ui/core'

import { replyStyle } from './styles'

const Reply = ({ reply, classes }) => (
  <div className={classes.root}>
    <div className={classes.left}>
      <Avatar src={reply.author.avatar_url} />
    </div>
    <div className={classes.right}>
      <span>{`${reply.author.loginname} ${dateformat(reply.create_at, 'yyyy-mm-dd hh:MM:ss')}`}</span>
      <p dangerouslySetInnerHTML={{ __html: marked(reply.content) }} />
    </div>
  </div>
)

Reply.propTypes = {
  reply: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(replyStyle)(Reply)
