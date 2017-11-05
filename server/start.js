
import config from './config';
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// var methodOverride = require('method-override');
// var session = require('express-session');
// var csrf = require('csurf');
import compression from 'compression';
import errorhandler from 'errorhandler';
import mongoose from 'mongoose';

import index from './router/index';
import article from './router/article';
import tags from './router/tag';

const db = mongoose.connect(config.mongodb.url, {
    useMongoClient: true,
    promiseLibrary: Promise
});

db.once('open' ,() => {
    console.log('连接数据库成功')
})

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('close', function() {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

const app = express();

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
app.all('*', function (req, res, next) {
    // 带 cookie 发送文件响应必须明确设置域，不能简单的用 *
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "HEAD, PUT, POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, Content-Type, Content-Range, Content-Disposition, Content-Description");
    res.header("Access-Control-Allow-Credentials", true);
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler())
}


app.use('/', index);
app.use('/api/article', article);
app.use('/api/tags', tags);

// server start

app.listen(config.app.port, function() {
    console.log("run in ", config.app.port)
});
