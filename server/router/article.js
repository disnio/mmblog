import express from 'express';
import model from '../model/article';
// import confirmToken from '../middleware/confirmToken';
const router = express.Router();

router.get('/', function(req, res) {
    model.find({}, function(err, docs){
        res.json(docs)
    })
    // model.find({}).select({"title":1, "createTime":1}).limit(2).sort({"_id": -1}).exec(function(err, docs){
    //     res.json(docs)
    // });
});
// 发布文章
router.post('/', (req, res) => {
    const createTime = new Date();
    const editTime = new Date();
    const article = {
        title: req.body.title,
        content: req.body.content,
        createTime: createTime,
        // tags: req.body.tags,
        publish: req.body.publish,
        editTime: editTime
    }

    const na = new model(article);
    na.save().then(function(doc) {
        console.log("xxx")
        res.json(doc)
    });
});

export default router
