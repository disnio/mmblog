import express from 'express'
import model from '../model/article'

const router = express.Router()

export async function getArticle (req, res) {
  const id = req.params.id.trim()
  if (id.trim == '') {
    res.status(400, 'id 不能为空')
  }
  const article = await model.findById(id).catch(err => {
    if (err.name === 'CastError') {
      res.status(400, 'id 不存在')
    } else {
      res.status(500, '服务器错误')
    }
  })
  res.json({
    success: true,
    article: article
  })
}

// 发布文章
export async function createArticle (req, res) {
  const article = {
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    publish: req.body.publish
  }

  const na = new model(article)
  let nares = await na.save().catch(function (err) {
    res.status(500, err)
  })
  await model.populate(nares, {path: 'tag'}, function (err, result) {
    nares = result
  })
  res.json({
    success: true,
    article: nares
  })
}

export async function getArticles (req, res) {
  const tag = req.query.tag || ''
  const page = req.query.page || 1
  const limit = req.query.limit==0 ? 2 : parseInt(req.query.limit, 10)
  const publish = req.query.publish && req.query.publish == 1
  let skip = 0
  let aArr
  let pageNum
  let aCount
  let publishObj = publish ? (publish == 1 ? {publish: true} : {publish: false}) : {}
  if (page !== 0) {
    skip = limit * (page - 1)
  }
  if (tag == '') {
    aArr = await model.find(publishObj).populate('tags').sort({createdAt: -1})
      .limit(limit)
      .skip(skip).catch(err => {
        return new Promise((resolve, reject) => {
          resolve([])
        })
      })
    aCount = await model.count(publishObj).catch(err => {
      return new Promise((resolve, reject) => {
        resolve(0)
      })
    })
  } else {
    let tagArr = tag.split(',')
    let queryObj = Object.assign({}, {tags: {'$in': tagArr}}, publishObj)
    aArr = await model.find(queryObj).populate('tags').sort({createdAt: -1})
      .limit(limit)
      .skip(skip).catch(err => {
        res.status(500, err)
      })
    aCount = await model.find(queryObj).count().catch(err => {
      res.status(500, err)
    })
  }
  pageNum = limit == 0 ? 1: Math.ceil(aCount / limit)
  res.json({
    success: true,
    articleArr: aArr,
    aCount: aCount,
    allPage: pageNum
  })
}

export async function modifyArticle (req, res) {
  const id = req.params.id
  const title = req.body.title
  const content = req.body.content
  const tags = req.body.tags
  const publish = req.body.publish && (req.body.publish == 1 ? 1 : 0)
  let queryObj = Object.assign({}, req.body, {publish})

  const article = await model.findByIdAndUpdate(id, {$set: queryObj}).catch(err => {
    if (err.name === 'CastError') {
      req.throw(400, 'id不存在')
    } else {
      req.throw(500, '服务器内部错误')
    }
  })
  res.json({
    success: true
  })
}

export async function deleteArticle (req, res) {
  const id = req.params.id
  const article = await model.findByIdAndRemove(id).catch(err => {
    if (err.name === 'CastError') {
      this.throw(400, 'id不存在')
    } else {
      this.throw(500, '服务器内部错误')
    }
  })
  res.json({
    success: true
  })
}

export default router
