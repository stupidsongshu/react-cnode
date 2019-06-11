import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

// import { withStyles } from '@material-ui/styles'

@inject(stores => ({
  appState: stores.appState,
  user: stores.appState.user,
})) @observer
class UserLogin extends React.Component {
  componentDidMount() {
    console.log(this.props.appState)
  }

  render() {
    const { isLogin } = this.props.user
    if (isLogin) {
      return '已登录'
    }
    return (
      <div>请登录</div>
    )
  }
}

UserLogin.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default UserLogin
