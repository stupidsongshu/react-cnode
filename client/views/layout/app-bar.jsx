import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

// import { AppBar, Toolbar, Button, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = {
  root: {
    flexGrow: 1,
  },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  title: {
    flexGrow: 1,
  },
}

@inject(stores => ({
  user: stores.appState.user,
})) @observer
class MainAppBar extends React.Component {
  menuIconClick = () => {
    this.props.history.push('/index')
  }

  createButtonClick = () => {
    this.props.history.push('/topic/create')
  }

  loginButtonClick = () => {
    if (this.props.user.isLogin) {
      this.props.history.push('/user/info')
    } else {
      this.props.history.push('/user/login')
    }
  }

  render() {
    const { classes, user } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.menuIconClick}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              CNode
            </Typography>
            <Button color="secondary" variant="contained" onClick={this.createButtonClick}>新建话题</Button>
            <Button color="secondary" variant="outlined" onClick={this.loginButtonClick}>
              {/* TODO bug: 登陆后提示user.info.loginname为undefined导致Button props校验报错 */}
              {user.isLogin ? (user.info.loginname || '') : '登录'}
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired,
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(MainAppBar))
