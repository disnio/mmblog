const express = require('express');
const router = express.Router();
const model = require('../model/tag');
const confirmToken = require('../middleware/confirmToken');

router.get('/', function(req, res) {
    res.status(200).send("my model name is: ")
});

router.post('/', (req, res) => {

    const tagName = req.body.name;

    const tag = model.findOne({name: tagName}).catch(err=>{
        res.status(500, "服务器错误")
    })

    const newTag = new model({
        name: tagName
    });
    newTag.save((err, doc) => {
        if (err) {
            res.json(err)
        } else {
            res.json(doc)
        }
    })
});

module.exports = router
