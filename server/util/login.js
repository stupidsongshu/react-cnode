const axios = require('axios')
const router = require('express').Router()

const baseUrl = 'https://cnodejs.org/api/v1'

router.post('/login', (req, res, next) => {
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accessToken
  }).then(response => {
    let data = response.data
    console.log('login response:', data)
    if (response.status === 200 && data.success) {
      req.session.user = {
        accessToken: req.body.accessToken,
        loginName: data.loginname,
        id: data.id,
        avatarUrl: data.avatar_url
      }
      res.json({
        success: true,
        data
      })
    }
    // else {
    //   res.send({
    //     success: false,
    //     data: 'need login'
    //   })
    // }
  }).catch(err => {
    if (err.response) {
      res.json({
        success: false,
        data: err.response.data
      })
    } else {
      next(err)
    }
  })
})

module.exports = router
