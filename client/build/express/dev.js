const devMiddleware = require('webpack-dev-middleware');

module.exports = (compiler, opts) => {
  const expressMiddleware = devMiddleware(compiler, opts)
  let nextFlag = false;
  function nextFn() {
    nextFlag = true;
  }
  function devFn(req, res, next) {
    expressMiddleware(req, {
        end: (content) => {
          req.body = content
        },
        setHeader: (name, value) => {
          req.headers[name] = value
        }
      }, nextFn)
    if(nextFlag) {
      nextFlag = false;
      return next();
    }
  }
  devFn.fileSystem = expressMiddleware.fileSystem
  return devFn;
}
