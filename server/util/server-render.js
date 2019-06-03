const ReactDOMServer = require('react-dom/server')
const asyncBootstrapper = require('react-async-bootstrapper').default
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const Helmet = require('react-helmet').default

const createMuiTheme = require('@material-ui/core/styles').createMuiTheme
const ServerStyleSheets = require('@material-ui/styles/ServerStyleSheets').default
const colors = require('@material-ui/core/colors')

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createApp = bundle.default
    const createStoreMap = bundle.createStoreMap

    const theme = createMuiTheme({
      palette: {
        primary: colors.lightBlue,
        secondary: colors.pink,
        type: 'light'
      }
    })
    const sheets = new ServerStyleSheets()

    const routerContext = {}
    const stores = createStoreMap()

    const app = createApp(stores, routerContext, theme, req.url)
    // console.log('app123456789:', app)

    // TODO 注意坑：react-async-bootstrapper版本问题，1.1.2可以，2.1.1版本有问题
    asyncBootstrapper(app).then(() => {
      /**
       * 当路由配置有Redirect的时候，react-router会在routerContext加上url属性，
       * 服务端渲染应检查此属性是否存在，如存在，server端直接跳转。
       */
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }

      const content = ReactDOMServer.renderToString(
        sheets.collect(app)
      )
      const state = getStoreState(stores)
      // res.send(template.replace('<!-- app -->', content))
      // 注意顺序：helmet需在renderToString之后
      const helmet = Helmet.rewind()
      // console.log(helmet)

      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        link: helmet.link.toString(),
        style: helmet.style.toString(),
        materialCss: sheets.toString(),
      })
      res.send(html)

      resolve()
    }).catch(reject)
  })
}
