let User = require('./models/users')
let Post = require('./models/posts')
let fs = require('fs')
const blogDir = './Blogs'

function initDB() {
  fs.readdirSync(blogDir).forEach(file => {
    let blog = require(blogDir + '/' + file)
    User.create({
      name: blog.author,
      title: blog.title,
      homeInfo: blog.homeInfo,
      homeImg: blog.homeImg,
    })
    blog.posts.forEach(p => {
      Post.create({
        author: blog.author,
        title: p.title,
        img: p.img,
        body: p.body,
        time: Date(),
      })
    })
  })
  console.log('initDB')
}

module.exports = initDB