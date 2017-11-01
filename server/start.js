const config = require('./config');
var http = require('http');
var express = require("express");
var path = require("path");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

// var methodOverride = require('method-override');
// var session = require('express-session');
var compression = require('compression');
var debug = require('debug')('server:server');
// var csrf = require('csurf');
var errorHandler = require('errorhandler');

const mongoose = require('mongoose');

global.db = mongoose.createConnection(config.mongodb.url, {
    useMongoClient: true
});
db.on('error', console.log);
var app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//要放在响应的最外
app.use(morgan('dev'));

app.use(compression({
    threshold: 1
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.use(methodOverride('_method'));
app.use(cookieParser());

// app.use(session({secret: 'pig', name: "_csrf", cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));
//跨域获取时候要禁止csrf
// app.use(csrf());

app.use(express.static(path.join(__dirname, 'public')));

//日志在静态内容后面
// app.all('*', function (req, res, next) {
//     // 带 cookie 发送文件响应必须明确设置域，不能简单的用 *
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "HEAD, PUT, POST, GET, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Content-Range, Content-Disposition, Content-Description");
//     res.header("Access-Control-Allow-Credentials", true);
//     // res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler())
}

const index = require('./router/index');
const article = require('./router/article');
app.use('/', index)
app.use('/api/article', article)

// server start
var server = http.createServer(app);
server.listen(config.app.port, function() {
    console.log("run in ", config.app.port)
    debug('Listening on ' + config.app.port);
});
