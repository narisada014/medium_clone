const articlecontroller = require('./../controllers/article.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {
  // どのルーティングの時にどのコントローラーに紐づいているかを明示的に示す
  // 全記事取得
  router
    .route('/articles')
    .get(articlecontroller.getAll)
  // 記事投稿（ヘッダーに画像ファイル送信用のmultipartついてる
  router
    .route('/article')
    .post(multipartWare, articlecontroller.addArticle)
  // 拍手ルーティング
  router
    .route('/article/clap')
    .post(articlecontroller.clapArticle)
  // コメント作成ルーティング
  router
    .route('/article/comment')
    .post(articlecontroller.commentArticle)
  // 特定の記事を取得するルーティング
  router
    .route('/article/:id')
    .get(articlecontroller.getArticle)
}
