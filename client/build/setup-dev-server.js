const path = require('path')
const webpack = require('webpack')

const clientConfig = require('./webpack.client.config')

module.exports = function setupDevServer (app) {
  let bundle
  let template

  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('./express/dev.js')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true
    },
    //noInfo: true
  })
  app.use(devMiddleware)

  
  // clientCompiler.plugin('done', () => {
  //   const fs = devMiddleware.fileSystem
  //   const filePath = path.join(clientConfig.output.path, 'front.html')
  //   console.log("clientPath",serverConfig.output.path)
  //   if (fs.existsSync(filePath)) {
  //     template = fs.readFileSync(filePath, 'utf-8')
  //   }
  // })

  // hot middleware
  app.use(require('./express/hot.js')(clientCompiler))
}
