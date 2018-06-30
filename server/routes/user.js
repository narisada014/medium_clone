const usercontroller = require('./../controllers/user.ctrl')

module.exports = (router) => {
  // userの情報を取得
  router
    .route('/user/:id')
    .get(usercontroller.getUser)

  // userのプロフィールを取得
  router
    .route('/user/profile/:id')
    .get(usercontroller.getUserProfile)

  // userを追加
  router
    .route('/user')
    .post(usercontroller.addUser)

  // userをフォローする
  router
    .route('/user/follow')
    .post(usercontroller.followUser)
}
