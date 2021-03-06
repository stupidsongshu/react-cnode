import {
  observable,
  action,
  toJS,
} from 'mobx'
import { get, post } from '../util/http'

class AppState {
  @observable user = {
    isLogin: false,
    info: {},
    detail: {
      syncing: false,
      recentTopics: [],
      recentReplies: [],
    },
    collection: {
      syncing: false,
      list: [],
    },
  }

  init({ user }) {
    if (user) {
      console.log('appState user:', user)
      this.user = user
    }
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
            console.log('login:', this.user.info.loginname)
            resolve()
          } else {
            reject(res.data)
          }
        }).catch(reject)
      }
    })
  }

  @action getUserDetail() {
    console.log('getUserDetail:', this.user.info.loginname)
    this.user.detail.syncing = true
    return new Promise((resolve, reject) => {
      get(`/user/${this.user.info.loginname}`).then((res) => {
        this.user.detail.syncing = false
        if (res.success) {
          this.user.detail.recentTopics = res.data.recent_topics
          this.user.detail.recentReplies = res.data.recent_replies
          resolve()
        } else {
          reject(res.data)
        }
      }).catch((err) => {
        this.user.detail.syncing = false
        reject(err)
      })
    })
  }

  @action getUserCollection() {
    this.user.collection.syncing = true
    return new Promise((resolve, reject) => {
      get(`/topic_collect/${this.user.info.loginname}`).then((res) => {
        this.user.collection.syncing = false
        if (res.success) {
          this.user.collection.list = res.data
          resolve()
        } else {
          reject(res.data)
        }
      }).catch((err) => {
        this.user.collection.syncing = false
        reject(err)
      })
    })
  }

  toJson() {
    return {
      user: toJS(this.user),
    }
  }
}

export default AppState
