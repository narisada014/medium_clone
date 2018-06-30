const Article = require('./../models/Article')
const User = require('./../models/User')
const fs = require('fs')
const cloudinary = require('cloudinary')

module.exports = {
  addArticle: (req, res, next) => {
    let { text, title, claps, description } = req.body
    if (req.files.image) {
      cloudinary.uploader.upload(req.files.image.path, (result) => {
        let obj = {text, title, claps, description, feature_img: result.url != null ? result.url : '' }
        saveArticle(obj)
      },
      {
        resource_type: 'image',
        eager: [
          {effect: 'sepia'}
        ]
      })
    } else {
      saveArticle({ text, title, claps, description, feature_img: '' })
    }
    function saveArticle(obj) {
      new Article(obj).save((err, article) => {
        if (err)
          res.send(err)
        else if (!article)
          res.send(400)
        else {
          return article.addAuthor(req.body.author_id).then((_article) => {
            return res.send(_article)
          })
        }
        // nodeは上から順番にコードが読まれて行くのでnextで次の処理に移動してやる（非同期処理に使ったりする）
        next()
      })
    }
  },
  getAll: (req, res, next) => {
    // リクエストIdからArticleを見つけて
    Article.find(req.params.id)
    // 紐づいてるauthorと、コメントのauthorも取得する
    .populate('author')
    .populate('comments.author').exec((err, article) => {
      if (err)
        res.send(err)
      else if (!article)
        res.send(404)
      else
        res.send(article)
      next()
    })
  },
  clapArticle: (req, res, next) => {
    Article.findById(req.body.article_id).then((article) => {
      return article.clap().then(() => {
        return res.json({msg: "Done"})
      })
    // エラーだった時に次の処理に行くように
    }).catch(next)
  },
  commentArticle: (req, res, next) => {
    Article.findById(req.body.article_id).then((article) => {
      // コメントメソッドを呼び出してコメントを追加
      return article.comment({
        author: req.body.author_id,
        text: req.body.comment
      }).then(() => {
        return res.json({msg: "Done"})
      })
    }).catch(next)
  },
  getArticle: (req, res, next) => {
    Article.findById(req.params.id)
    .populate('author')
    .populate('comments.author').exec((err, article) => {
      if (err)
        res.send(err)
      else if (!article)
        res.send(404)
      else
        res.send(article)
      next()
    })
  }

}
