const express = require("express")
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary')
// .envの中身を格納
const env = require('dotenv').config()

const app = express()
const router = express.Router()
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/medium"

cloudinary.config({
  cloud_name: env.parsed.CLOUD_NAME,
  api_key: env.parsed.API_KEY,
  api_secret: env.parsed.API_SECRET
})

try {
  mongoose.connect(url, {})
} catch (error) {}

let port = 5000 || process.env.PORT

// routes配下のrouteファイルのrouterにexpressのrouterを渡してやる
routes(router)

// cors-originのエラー回避
app.use(cors())
// req.bodyのjsonパース用
app.use(bodyParser.json())
// セキュリティ用のnode_modeules(http://expressjs.com/ja/advanced/best-practice-security.html)
app.use(helmet())
// この設定をすることでnamespace(/api)がルーティングの最初につく
app.use('/api', router)

app.listen(port, () => {
  console.log(`Server started at port: ${port}`)
})
