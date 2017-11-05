
import mongoose from 'mongoose'
import moment from 'moment';
mongoose.Promise = global.Promise;
moment.locale('zh-cn');
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    title: String,
    content: String,
    // tags: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'tag'
    // }],
    publish: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});
articleSchema.set('toJSON', {
    getters: true,
    virtuals: true
});
articleSchema.set('toObject', {
    getters: true,
    virtuals: true
});
c
const article = mongoose.model('article', articleSchema);
export default article;
