import jwt from 'jsonwebtoken';
import config from '../config';
const secret = config.jwt;

// 检查token是否正确
const confirmToken = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).end('no token')
    } else {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, secret.cert, function (err) {
            if (err) {
              if ('TokenExpiredError' === err.name) {
                res.status(401, 'token expired,请及时本地保存数据！');
              }
              res.status(401).end(err.message)
            }
        })
    }
    next()
}

export default confirmToken
