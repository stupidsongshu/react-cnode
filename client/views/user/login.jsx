import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import querystring from 'query-string'

import { withStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import UserWrapper from './user'
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
    this.props.appState.login(accessToken).catch((err) => {
      console.log(err)
      this.setState({
        helperText: err.data.error_msg,
      })
    })
  }

  render() {
    const { user, classes } = this.props
    const search = querystring.parse(this.props.location.search)

    if (user.isLogin) {
      return <Redirect to={search.redirect || '/user/info'} />
    }

    return (
      <UserWrapper>
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
      </UserWrapper>
    )
  }
}

UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  // history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
UserLogin.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default withStyles(loginStyles)(UserLogin)
