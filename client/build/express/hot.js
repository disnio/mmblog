const hotMiddleware = require('webpack-hot-middleware')
const PassThrough = require('stream').PassThrough;

module.exports = (compiler, opts) => {
  const expressMiddleware = hotMiddleware(compiler, opts)
  return (req, res, next) => {
    let stream = new PassThrough()
    req.body = stream
    return expressMiddleware(ctx.req, {
      write: stream.write.bind(stream),
      writeHead: (state, headers) => {
        res.state = state
        res.set(headers)
      }
    }, next);
  }
}
