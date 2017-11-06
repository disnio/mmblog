import mongoose from 'mongoose'
import moment from 'moment';
mongoose.Promise = global.Promise;
moment.locale('zh-cn');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  user_name: String,
  password: String,
  admin: {type: String, default:'管理员'},
  status: Number, //1:管理员， 2:超级管理员
  avatar: {type: String, default:'default.jpg'},
  city:String,
  address:{type:String, default:''},
});

adminSchema.index({id: 1});
const Admin = mongoose.model('Admin', adminSchema);
export default Admin;