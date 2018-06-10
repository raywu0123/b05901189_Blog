let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
  name: String,
  title: String,
  homeInfo: String,
  homeImg: String,
})

let User = module.exports = mongoose.model('Users', userSchema)