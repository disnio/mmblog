var utils = require('./utils')

var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction ? false : false,
    extract: isProduction
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['last 2 versions']
    })
  ]
}
