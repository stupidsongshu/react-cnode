const express = require('express')
const path = require('path')
const fs = require('fs')
const ReactSSR = require('react-dom/server')

const isDev = process.env.NODE_ENV === 'development'
console.log('server isDev:', isDev)

const app = express()

if (!isDev) {
  const serverEntry = require('../dist/server-entry.js').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')

  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', (req, res) => {
    const appString = ReactSSR.renderToString(serverEntry)
    const templateReplace = template.replace('<!-- app -->', appString)
    res.send(templateReplace)
  })
} else {
  const devStatic = require('./util/dev-static')
  // 模板html、bundle 都在内存，而不在磁盘上
  devStatic(app)
}

app.listen(9999, function() {
  console.log('server is listening on 9999')
})
