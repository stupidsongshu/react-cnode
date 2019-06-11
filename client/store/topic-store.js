import {
  observable,
  // toJS,
  computed,
  action,
  extendObservable,
} from 'mobx'
import { topicSchema } from '../util/variable-define'
import { get } from '../util/http'

const createTopic = topic => Object.assign({}, topicSchema, topic)

class Topic {
  constructor(data) {
    extendObservable(this, data)
  }

  @observable syncing = false
}

class TopicStore {
  @observable topics

  @observable syncing

  @observable details

  constructor({ syncing = false, topics = [], details = [] } = {}) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(detail => new Topic(createTopic(detail)))
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @computed get detailsMap() {
    return this.details.reduce((result, detail) => {
      result[detail.id] = detail
      return result
    }, {})
  }

  @action fetchTopics(tab) {
    return new Promise((resolve, reject) => {
      this.syncing = true
      this.topics = []
      get('/topics', {
        mdrender: false,
        tab,
      }).then((res) => {
        this.syncing = false
        if (res.success) {
          res.data.forEach((topic) => {
            this.addTopic(topic)
          })
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
}

export default TopicStore
