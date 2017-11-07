import mongoose from 'mongoose'
import config from '../config'
export default function db() {
  const db = mongoose.connect(config.mongodb.url, {
    useMongoClient: true,
    promiseLibrary: Promise
  })

  db.once('open', () => {
    console.log('连接数据库成功')
  })

  db.on('error', function (error) {
    console.error('Error in MongoDb connection: ' + error)
    mongoose.disconnect()
  })

  db.on('close', function () {
    console.log('数据库断开，重新连接数据库')
    mongoose.connect(config.url, {server: {auto_reconnect: true}})
  })
}
