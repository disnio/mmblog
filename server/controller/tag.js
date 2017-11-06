import model from '../model/tag';
import Article from '../model/article';
// import confirmToken from '../middleware/confirmToken';

export async function createTag(req, res) {
    const tagName = req.body.name;

    const tag = await model.findOne({name: tagName}).catch(err=>{
        res.status(500, err)
    });

    if(tag !== null){
        res.status(400).json({
          success: false,
          message: "标记已存在"
        })
    }

    const newTag = new model({
        name: tagName
    });
    const tagResult = await newTag.save().catch(err=>{
        res.json(err)
    });

    res.json(tagResult);

}

export async function getTags(req, res) {
    const tags = await model.find().catch(err=>{
        res.status(500, err)
    });

    res.json(tags);
}

export async function modifyTag(req, res) {
    const id = req.params.id;
    const name = req.body.name;

    const tag = await Article.findByIdAndUpdate(id, {$set: {name: name}}).catch(err=>{
        res.status(500, err)
    });
    res.json(tag);
}

export async function deleteTag(req, res) {
    const id = req.params.id;
    const tag = await model.findByIdAndRemove(id).catch(err=>{
        res.json(err)
    });
    res.json(tag)
}
