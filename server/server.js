const express = require('express')
const path = require('path')
const fs = require('fs')
// const ReactSSR = require('react-dom/server')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const serverRender = require('./util/server-render')

const isDev = process.env.NODE_ENV === 'development'
console.log('server isDev:', isDev)

const app = express()

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Access the session as req.session
app.use(session({
  // cookie: {
  //   maxAge: 10 * 60 * 1000
  // },
  maxAge: 10 * 60 * 1000,
  // The default value is 'connect.sid'.
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode app'
}))

app.use('/api/user', require('./util/login'))
app.use('/api', require('./util/proxy'))

app.use(favicon(path.join(__dirname, '../favicon.ico')))

if (!isDev) {
  // const serverEntry = require('../dist/server-entry.js').default
  // const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')

  const serverEntry = require('../dist/server-entry.js')
  const template = fs.readFileSync(path.join(__dirname, '../dist/server.template.ejs'), 'utf-8')

  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', (req, res, next) => {
    // const appString = ReactSSR.renderToString(serverEntry)
    // const templateReplace = template.replace('<!-- app -->', appString)
    // res.send(templateReplace)
    serverRender(serverEntry, template, req, res).catch(next)
  })
} else {
  const devStatic = require('./util/dev-static')
  // 模板html、bundle 都在内存，而不在磁盘上
  devStatic(app)
}

// express 全局错误处理
app.use((error, req, res, next) => {
  console.log('全局错误处理------', error)
  res.status(500).send(error.toString())
})

app.listen(9999, function() {
  console.log('server is listening on 9999')
})
