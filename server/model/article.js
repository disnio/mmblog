const mongoose = require('mongoose');
const moment = require('moment');
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
    },
    createTime: {
        type: Date
    },
    editTime: {
        type: Date,
        default: Date.now
    }
}, {
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
articleSchema.path('createTime').get(function(v) {
    return moment(v).format('lll');
});
articleSchema.path('editTime').get(function(v) {
    return moment(v).format('lll');
});

module.exports = db.model('article', articleSchema);
