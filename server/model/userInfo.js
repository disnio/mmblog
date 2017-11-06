import mongoose from 'mongoose'
import moment from 'moment';
mongoose.Promise = global.Promise;
moment.locale('zh-cn');
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
  user_id:Number,
  avatar: {type: String, default:'default.jpg'},
  city: String,
  address:{type:String, default:''},
  email: {type: String, default:''},
  is_email_valid:{type:Boolean, default:false},
  is_active: {type: Number, default: 1},
  mobile: {type: String, default: ''},
  is_mobile_valid:{type:Boolean, default:false}
});
userInfoSchema.path('createdAt').get(function(v) {
  return moment(v).format('lll');
});
userInfoSchema.path('updatedAt').get(function(v) {
  return moment(v).format('lll');
});
userInfoSchema.index({id: 1});
const UserInfo = mongoose.model('UserInfo', userInfoSchema);
export default UserInfo;