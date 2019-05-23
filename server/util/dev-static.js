const webpack = require('webpack')
const axios = require('axios')
const path = require('path')
const MemoryFS = require('memory-fs')
const ReactDOMServer = require('react-dom/server')
const proxy = require('http-proxy-middleware')

const serverConfig = require('../../build/webpack.config.server')

let serverBundle
let Module = module.constructor

/**
 * 开发环境是通过 webpack-dev-server 启动，编译后的数据都在内存中
 */
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://127.0.0.1:8888/public/index.html')
      .then(res => {
        console.log('开发环境获取模板成功1')
        resolve(res.data)
      })
      .catch(err => {
        console.log('开发环境获取模板失败1')
        reject(err)
      })
  })
}

// 开发环境使用 memory-fs 提高效率
const mfs = new MemoryFS()

/**
 * 导入的 webpack 函数需要传入一个 webpack 配置对象，
 * 当同时传入回调函数时就会执行 webpack compiler,
 * 如果你不向 webpack 执行函数传入回调函数，就会得到一个 webpack Compiler 实例。
 * 你可以通过它手动触发 webpack 执行器，或者是让它执行构建并监听变更。和 CLI API 很类似。
 */
const compiler = webpack(serverConfig)

/**
 * 自定义文件系统(Custom File Systems)
 * 默认情况下，webpack 使用普通文件系统来读取文件并将文件写入磁盘。
 * 但是，还可以使用不同类型的文件系统（内存(memory), webDAV 等）来更改输入或输出行为。
 * 为了实现这一点，可以改变 inputFileSystem 或 outputFileSystem。
 * 例如，可以使用 memory-fs 替换默认的 outputFileSystem，以将文件写入到内存中，而不是写入到磁盘
 */
compiler.outputFileSystem = mfs

/**
 * 调用 watch 方法会触发 webpack 执行器，
 * 但之后会监听变更（很像 CLI 命令: webpack --watch），
 * 一旦 webpack 检测到文件变更，就会重新执行编译。
 * 该方法返回一个 Watching 实例。
 */
compiler.watch({}, (err, stats) => {
  console.log('compiler watch start, because of the client webpack-dev-server compiled')
  /**
   * 错误处理(error handling)
   * 完备的错误处理中需要考虑以下三种类型的错误：
   * 1. 致命的 wepback 错误（配置出错等）
   * 2. 编译错误（缺失的 module，语法错误等）
   * 3. 编译警告
   */
  if (err) {
    console.error('compiler watch err:', err.stack || err)
    if (err.details) {
      console.error('compiler watch err.details:', err.details)
    }
    return
  }
  // 以 JSON 对象形式返回编译信息
  // stats = stats.toJson()
  // stats.errors.forEach(error => console.error(error))
  // stats.warnings.forEach(warn => console.warn(warn))

  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.error('stats.hasErrors:', info.errors);
  }
  if (stats.hasWarnings()) {
    console.warn('stats.hasWarnings:', info.warnings);
  }

  // console.log('compiler.outputFileSystem---', compiler.outputFileSystem.data.Users.squirrel.repositories.react['react-cnode'])

  // 疑问：为什么这里不用加上 serverConfig.output.publicPath
  const bundlePath = path.join(
    serverConfig.output.path,
    // serverConfig.output.publicPath,
    serverConfig.output.filename
  )
  console.log('bundlePath------:', bundlePath)
  // readFileSync 默认返回 buffer， 加上第二个参数 utf-8 返回字符串
  const serverBundleStr = mfs.readFileSync(bundlePath, 'utf-8')
  // console.log('serverBundleStr---------', serverBundleStr)
  // 从server-entry.js里面读出的是js字符串，以下为处理成可执行代码的hack方法
  const m = new Module()
  // console.log('m1---------------', m)
  m._compile(serverBundleStr, serverConfig.output.filename)
  // console.log('m2----------------', m)
  serverBundle = m.exports.default
  console.log('serverBundle----:', serverBundle)
})

module.exports = (app) => {
  // 静态资源代理
  app.use('/public', proxy({
    target: 'http://127.0.0.1:8888'
  }))

  // if (!serverBundle) {
  //   console.log('please wait a little')
  //   return
  // }

  app.get('*', (req, res) => {
    getTemplate().then(template => {
      console.log('开发环境获取模板成功:', template)
      let appStr = ReactDOMServer.renderToString(serverBundle)
      console.log('appStr----', appStr)
      res.send(template.replace('<!-- app -->', appStr))
    }).catch(err => {
      console.error('开发环境获取模板后失败:', err)
      res.status(500).send(err.toString())
    })
  })
}
