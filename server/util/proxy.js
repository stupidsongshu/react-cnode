const axios = require('axios')
const querystring = require('query-string')

const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = (req, res, next) => {
  let path = req.path
  let user = req.session.user || {}

  let needAccessToken = req.query.needAccessToken
  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      data: 'need login'
    })
  }

  const query = Object.assign({}, req.query, {
    accesstoken: (needAccessToken && req.method === 'GET') ? user.accessToken : ''
  })
  if (needAccessToken) delete query.needAccessToken

  axios({
    url: `${baseUrl}/${path}`,
    method: req.method,
    params: query,
    data: querystring.stringify(Object.assign({}, req.body, {
      accesstoken: (needAccessToken && req.method === 'POST') ? user.accessToken : ''
    })),
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => {
    if (response.status === 200) {
      res.send(response.data)
    } else {
      res.status(response.status).send(response.data)
    }
  }).catch(err => {
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        data: 'unknow error'
      })
    }
  })
}
