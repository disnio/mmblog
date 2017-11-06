import mongoose from 'mongoose'
import moment from 'moment';
mongoose.Promise = global.Promise;
moment.locale('zh-cn');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String
}, { versionKey: false, timestamps: true });
userSchema.path('createdAt').get(function(v) {
    return moment(v).format('lll');
});
userSchema.path('updatedAt').get(function(v) {
    return moment(v).format('lll');
});
export default mongoose.model('user', userSchema);
