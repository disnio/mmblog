import config from './config'
import express from 'express'
import opn from 'opn'
import morgan from 'morgan'
import errorhandler from 'errorhandler'
import proxyMiddleware from 'http-proxy-middleware'
import historyApiFallback from 'connect-history-api-fallback'
const webpack = require('webpack')
const clientConfig = require('./webpack.client.config')
const hotMiddleware = require('webpack-hot-middleware')
const devMiddleware = require('webpack-dev-middleware')

const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || config.dev.port
const autoOpenBrowser = !!config.dev.autoOpenBrowser
const app = express()

// 可以采用代理分离

let proxypath;
const context = config.dev.context
switch(process.env.NODE_ENV){
  case 'development':
  case 'production':
    proxypath = 'http://localhost:' + config.server.port;
    break;
  case 'online':
    proxypath = 'http://www.wuaim.com:' + config.server.port;
    break;
  default:
    proxypath = config.dev.proxypath;
}
const proxyOptions = {
  target: proxypath,
  changeOrigin: true,
}
// 路径重写 pathRewrite: {'^/old/api' : '/new/api'}
// 路由重写 router { 'integration.localhost:3000' : 'http://localhost:8001'}
if (context.length) {
  app.use(proxyMiddleware(context, proxyOptions))
}

// 路由直接走historyApiFallback,不用服务端渲染
app.use(historyApiFallback({
  verbose: true,
  index: '/front.html',
  rewrites: [
    {from: /^\/admin$/, to: '/admin.html'},
    {from: /^\/admin\/login/, to: '/admin.html'},
    {from: /^\/front/, to: '/front.html'}
  ]
}))
//一定要放在 fallback 后面
if (!isProd) {
  const clientCompiler = webpack(clientConfig)
  app.use(devMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true
    },
    //noInfo: true
  }))

  app.use(hotMiddleware(clientCompiler))

  devMiddleware.waitUntilValid(function () {
    console.log('> dev server start\n')
  })
}else {
  console.log("server production")
}

app.use(morgan('dev'))
app.use(errorhandler())

const uri = 'http://localhost:' + port
app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  if (autoOpenBrowser) {
    opn(uri)
  }
  console.log('开发服务器已运行在端口： ', port)
})
