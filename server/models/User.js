const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    provider: String,
    provider_id: String,
    token: String,
    provider_pic: String,
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  }
)
UserSchema.methods.follow = function(user_id) {
  // -1はfalseの時に返ってくる値(配列の内部を走査した結果存在しなければ-1)
  if (this.following.indexOf(user_id) === -1) {
    this.following.push(user_id)
  }
  return this.save()
}
UserSchema.methods.addFollower = function(fs) {
  this.followers.push(fs)
}

module.exports = mongoose.model('User', UserSchema)
