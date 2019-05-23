const axios = require('axios')

const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = (req, res, next) => {
  let path = req.path
  let query = req.query
  let body = req.body
  let user = req.session.user || {}

  let needAccessToken = query.needAccessToken
  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      data: 'need login'
    })
  }

  if (needAccessToken) delete query.needAccessToken

  axios({
    url: `${baseUrl}/${path}`,
    method: req.method,
    params: query,
    data: body,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => {
    let data = response.data
    if (response.status === 200 && data.success) {
      res.send(data)
    }
  }).catch(err => {
    if (err.response) {
      res.status(500).send({
        success: false,
        data: err.response
      })
    } else {
      res.status(500).send({
        success: false,
        data: 'unknow error'
      })
    }
  })
}
