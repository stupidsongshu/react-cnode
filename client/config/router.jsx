import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import ApiTest from '../views/test/api-test'
import UserLogin from '../views/user/login'
import UserInfo from '../views/user/info'

export default () => [
  <Route path="/" render={() => <Redirect to="/index" />} exact key="first" />,
  <Route path="/index" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={TopicDetail} key="detail" />,
  <Route path="/test" component={ApiTest} key="test" />,
  <Route path="/user/login" component={UserLogin} key="login" />,
  <Route path="/user/info" component={UserInfo} key="user-info" />,
]
