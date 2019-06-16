import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

import ApiTest from '../views/test/api-test'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import TopicCreate from '../views/topic-create/index'
import UserLogin from '../views/user/login'
import UserInfo from '../views/user/info'

const PrivateRoute = ({ isLogin, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isLogin ? <Component {...props} /> : (
        <Redirect to={{
          pathname: '/user/login',
          search: `?redirect=${rest.path}`,
        }}
        />
      )
    )}
  />
)

const InjectedPrivateRoute = withRouter(inject(stores => ({
  isLogin: stores.appState.user.isLogin,
}))(observer(PrivateRoute)))

PrivateRoute.propTypes = {
  isLogin: PropTypes.bool,
  component: PropTypes.element.isRequired,
}

PrivateRoute.defaultProps = {
  isLogin: false,
}

export default () => [
  <Route path="/" render={() => <Redirect to="/index" />} exact key="first" />,
  <Route path="/test" component={ApiTest} key="test" />,
  <Route path="/index" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={TopicDetail} key="detail" />,
  <Route path="/user/login" component={UserLogin} key="login" />,
  <InjectedPrivateRoute path="/user/info" component={UserInfo} key="user-info" />,
  <InjectedPrivateRoute path="/topic/create" component={TopicCreate} key="topic-create" />,
]
