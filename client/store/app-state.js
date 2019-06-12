import {
  observable,
  // computed,
  // autorun,
  action,
} from 'mobx'
import { post } from '../util/http'

export default class AppState {
  @observable user = {
    isLogin: false,
    info: {},
  }

  @action login(accessToken) {
    return new Promise((resolve, reject) => {
      if (this.user.isLogin) {
        resolve()
      } else {
        post('/user/login', {}, {
          accessToken,
        }).then((res) => {
          if (res.success) {
            this.user.isLogin = true
            this.user.info = res.data
            resolve()
          } else {
            reject(res.data)
          }
        }).catch(reject)
      }
    })
  }
}
