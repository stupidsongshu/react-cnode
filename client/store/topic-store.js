import {
  observable,
  computed,
  action,
  extendObservable,
  toJS,
} from 'mobx'
import { topicSchema, replySchema } from '../util/variable-define'
import { get, post } from '../util/http'

const createTopic = topic => Object.assign({}, topicSchema, topic)

const createReply = reply => Object.assign({}, replySchema, reply)

class Topic {
  constructor(data) {
    extendObservable(this, data)
  }

  @observable syncing = false

  @observable createdReplies = []

  @action doReply(content) {
    return new Promise((resolve, reject) => {
      post(`/topic/${this.id}/replies`, {
        needAccessToken: true,
      }, { content }).then((res) => {
        if (res.success) {
          this.createdReplies.push(createReply({
            id: res.reply_id,
            content,
            create_at: Date.now(),
          }))
          resolve()
        } else {
          reject(res)
        }
      }).catch(reject)
    })
  }
}

class TopicStore {
  @observable topics

  @observable syncing

  @observable details

  @observable tab

  constructor({
    syncing = false,
    topics = [],
    details = [],
    tab = null,
  } = {}) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(detail => new Topic(createTopic(detail)))
    this.tab = tab
  }

  @computed get detailsMap() {
    return this.details.reduce((result, detail) => {
      result[detail.id] = detail
      return result
    }, {})
  }

  @action fetchTopics(tab) {
    return new Promise((resolve, reject) => {
      if (this.tab === tab && this.topics.length > 0) {
        resolve()
        return
      }

      this.syncing = true
      this.tab = tab
      this.topics = []
      get('/topics', {
        mdrender: false,
        tab,
      }).then((res) => {
        this.syncing = false
        if (res.success) {
          this.topics = res.data.map(topic => new Topic(createTopic(topic)))
          resolve()
        } else {
          reject()
        }
      }).catch((err) => {
        this.syncing = false
        reject(err)
      })
    })
  }

  @action fetchTopicDetail(id) {
    return new Promise((resolve, reject) => {
      if (this.detailsMap[id]) {
        resolve(this.detailsMap[id])
      } else {
        get(`/topic/${id}`, {
          mdrender: false,
        }).then((res) => {
          if (res.success) {
            const topic = new Topic(createTopic(res.data))
            this.details.push(topic)
            resolve(topic)
          } else {
            reject()
          }
        }).catch(reject)
      }
    })
  }

  toJson() {
    return {
      topics: toJS(this.topics),
      syncing: this.syncing,
      details: toJS(this.details),
      tab: this.tab,
    }
  }
}

export default TopicStore
