const express = require('express')
const path = require('path')
const fs = require('fs')
const ReactSSR = require('react-dom/server')
const serverEntry = require('../dist/server-entry').default

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

const app = express()

app.use('/public', express.static(path.join(__dirname, '../dist')))

app.get('*', function(req, res) {
  const appString = ReactSSR.renderToString(serverEntry)
  res.send(template.replace('<!-- app -->', appString))
})

app.listen(9999, function() {
  console.log('Server is listening on 9999')
})
