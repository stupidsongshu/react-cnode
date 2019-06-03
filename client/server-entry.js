import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import { ThemeProvider } from '@material-ui/styles'
import App from './views/App'
import { createStoreMap } from './store/store'

// export default <App />

// 让mobx在服务端渲染的时候不会重复数据交换
useStaticRendering(true)

export default (stores, routerContext, theme, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StaticRouter>
  </Provider>
)

export { createStoreMap }
