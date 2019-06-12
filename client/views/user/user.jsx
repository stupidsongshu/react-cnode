import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/styles'
import UserIcon from '@material-ui/icons/AccountCircle'

import Container from '../layout/container'
import userStyles from './styles/user-style'

@inject(stores => ({
  user: stores.appState.user,
})) @observer
class User extends React.Component {
  render() {
    const { classes, children, user } = this.props
    return (
      <Container>
        <div className={classes.avatar}>
          <div>
            {
              user.isLogin
                ? <Avatar className={classes.avatarImg} src={user.info.avatar_url} />
                : <Avatar><UserIcon className={classes.avatarImg} /></Avatar>
            }
            <span className={classes.userName}>{user.isLogin ? user.info.loginname : '未登录'}</span>
          </div>
          {children}
        </div>
      </Container>
    )
  }
}

User.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.node,
  ]).isRequired,
}

export default withStyles(userStyles)(User)
