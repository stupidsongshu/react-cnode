import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

import { withStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import User from './user'
import loginStyles from './styles/login-style'

@inject(stores => ({
  appState: stores.appState,
  user: stores.appState.user,
})) @observer
class UserLogin extends React.Component {
  constructor() {
    super()
    this.state = {
      helperText: '',
      accessToken: '18aa79ea-7af3-41f2-a2fc-241c93e888df',
    }
  }

  componentWillMount() {
    if (this.props.user.isLogin) {
      this.props.history.replace('/user/info')
    }
  }

  handleInput = (e) => {
    this.setState({
      accessToken: e.target.value.trim(),
    })
  }

  handleLogin = () => {
    const { accessToken } = this.state
    if (!accessToken) {
      this.setState({
        helperText: '请填写accessToken',
      })
      return
    }
    this.setState({
      helperText: '',
    })
    this.props.appState.login(accessToken).then(() => {
      this.props.history.replace('/user/info')
    }).catch((err) => {
      console.log(err)
      this.setState({
        helperText: err.data.error_msg,
      })
    })
  }

  render() {
    const { user, classes } = this.props
    if (user.isLogin) {
      return <div>已登录</div>
    }
    return (
      <User>
        <div className={classes.root}>
          <TextField
            label="请输入Cnode AccessToken1"
            placeholder="请输入Cnode AccessToken2"
            className={classes.input}
            helperText={this.state.helperText}
            value={this.state.accessToken}
            onChange={this.handleInput}
          />
          <Button
            color="secondary"
            variant="contained"
            className={classes.loginButton}
            onClick={this.handleLogin}
          >
            登录
          </Button>
        </div>
      </User>
    )
  }
}

UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}
UserLogin.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default withStyles(loginStyles)(UserLogin)
