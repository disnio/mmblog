const config = {
    app: {
        port: 8000,
        baseApi: '/api'
    },
    mongodb: {
        url: 'mongodb://120.27.33.179:27017/mmblog'
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

export default config;
