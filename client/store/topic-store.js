import {
  observable,
  // toJS,
  // computed,
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

  constructor({ syncing, topics } = { syncing: false, topics: [] }) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
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
}

export default TopicStore
