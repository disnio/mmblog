const path = require('path')
const webpack = require('webpack')
const clientConfig = require('./webpack.client.config')
const hotMiddleware = require('webpack-hot-middleware')
const devMiddleware = require('webpack-dev-middleware')
const isProd = process.env.NODE_ENV === 'production'

module.exports = function setupDevServer (app) {
  const clientCompiler = webpack(clientConfig)

  if(!isProd){
    app.use(devMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      stats: {
        colors: true
      },
      //noInfo: true
    }))

    app.use(hotMiddleware(clientCompiler))
  }
}
