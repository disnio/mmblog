const express = require('express');
const router = express.Router();
const model = require('../model/article');
const confirmToken = require('../middleware/confirmToken');

router.get('/', function(req, res){
    res.status(200).send("my model name is: ")
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
    new model(article).save((err, doc) => {
        if(err){
            res.json(err)
        }else{
            res.json(doc)
        }
    })
});

module.exports = router
