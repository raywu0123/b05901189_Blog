let mongoose = require('mongoose')

let postSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    img: String,
    author: String,
    time: Date,
  }
)

let Post = module.exports = mongoose.model('Posts', postSchema)