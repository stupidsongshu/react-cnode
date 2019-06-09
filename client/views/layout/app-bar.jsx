import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
// import { makeStyles } from '@material-ui/styles'

// import { AppBar, Toolbar, Button, IconButton } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }))

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

class MainAppBar extends React.Component {
  menuIconClick = () => {

  }

  createButtonClick = () => {

  }

  loginButtonClick = () => {

  }

  render() {
    const { classes } = this.props
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
            <Button color="secondary" onClick={this.loginButtonClick}>登录</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainAppBar)
