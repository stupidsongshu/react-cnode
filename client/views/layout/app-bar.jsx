import React from 'react'
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
  appState: stores.appState,
})) @observer
class MainAppBar extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    console.log(this.props)
    console.log(this.props.history) // undefined
    console.log(this.context) // undefined
  }

  menuIconClick = () => {
    // this.props.history.push('/index')
  }

  createButtonClick = () => {

  }

  loginButtonClick = () => {
    // if (this.props.appState.user.isLogin) {
    //   this.props.history.push('/user/info')
    // } else {
    //   this.props.history.push('/user/login')
    // }
  }

  render() {
    const { classes } = this.props
    const { user } = this.props.appState
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
            <Button color="secondary" onClick={this.loginButtonClick}>
              {user.isLogin ? user.info.loginname : '登录'}
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
}

export default withStyles(styles)(MainAppBar)
