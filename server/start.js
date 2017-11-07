import config from './config'
import express from 'express'
import path from 'path'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
// var methodOverride = require('method-override');
// var session = require('express-session');
// var csrf = require('csurf');
import compression from 'compression'
import errorhandler from 'errorhandler'
import db from './helper/db'
import historyApiFallback from 'connect-history-api-fallback'
import index from './router/index'
import article from './router/article'
import tags from './router/tag'
import user from './router/user'

db();
const app = express()

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//要放在响应的最外
app.use(morgan('dev'))
app.use(compression({
  threshold: 1
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
// app.use(methodOverride('_method'));
app.use(cookieParser())
// app.use(session({secret: 'pig', name: "_csrf", cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));
//跨域获取时候要禁止csrf
//日志在静态内容后面
app.all('*', function (req, res, next) {
  // 带 cookie 发送文件响应必须明确设置域，不能简单的用 *
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Methods', 'HEAD, PUT, POST, GET, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization, Content-Type, Content-Range, Content-Disposition, Content-Description')
  res.header('Access-Control-Allow-Credentials', true)
  // res.header("Content-Type", "application/json;charset=utf-8");
  next()
})

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
const root = path.join(__dirname, '../client/dist')

require('../client/build/setup-dev-server')(app)
app.use(express.static(root))

//服务端接口路由
app.use('/', index)
app.use('/api/articles', article)
app.use('/api/tags', tags)
app.use('/api/user', user)
//错误处理
app.use(errorhandler())

app.listen(config.app.port, function () {
  console.log('服务已运行在端口： ', config.app.port)
})
