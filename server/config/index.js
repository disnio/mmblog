const fs = require('fs');
let config = {
    app: {
        port: process.env.PORT || 8889,
        baseApi: '/api'
    },
    mongodb: {
        url: 'mongodb://localhost:27017/mmblog'
    },
    jwt: {
        secret: 'allen'
    },
    mongodbSecret: {
        user: '',
        pass: ''
    },
    admin: {
        user: 'admin',
        pwd: 'admin'
    }
}

module.exports = config;
