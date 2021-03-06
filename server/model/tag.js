import mongoose from 'mongoose'
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const tagSchema = new Schema({
  name: {
    type: String,
    default: ''
  }
}, { versionKey: false });
tagSchema.set('toJSON', { getters: true, virtuals: true });
tagSchema.set('toObject', { getters: true, virtuals: true }); //普通+虚拟

export default mongoose.model('tag', tagSchema);
