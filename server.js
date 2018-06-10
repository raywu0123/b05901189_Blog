var express = require('express')
const path = require('path')
var app = express()
var cors = require('cors')
var server = require('http').createServer(app)
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
var initDB = require('./initDB')
var Post = require('./models/posts')
var User = require('./models/users')
const config = require('./config')

// app.use(express.static(path.resolve(__dirname, "client", "build")))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(config.db)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db')
});
db.collections['users'].drop(() => {console.log('blog collection dropped')})
db.collections['posts'].drop(() => {console.log('post collection dropped')})
initDB()

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
// })

app.get('/posts/:username', (req, res) => {
  console.log('req', req.params)
  Post.find({author: req.params.username}, null, {sort: {time: -1}}, (err, posts) => {
    console.log(posts)
    res.send(JSON.stringify(posts))
  })
})
app.get('/post/:postId', (req, res) => {
  console.log('req', req.params)
  if (req.params.postId.slice(0, 9) === 'homepage:') {
    const username = req.params.postId.slice(9) 
    User.findOne({name: username}, (err, user) => {
      console.log(user)
      res.send(JSON.stringify({title: user.homeInfo, body: '', img: user.homeImg}))
    })
  } else {
    Post.findOne({_id: req.params.postId}, (err, post) => {
      console.log(post)
      res.send(JSON.stringify(post))
    })
  }
})
app.delete('/post/:postId', (req, res) => {
  console.log('req', req.params)
  Post.findByIdAndRemove(req.params.postId, (err, post) => {
    if (err) res.send({ok: false})
    else res.send({ok: true})
  })
})
app.get('/user/:username', (req, res) => {
  console.log('req', req.params)
  User.find({name: req.params.username}, (err, users) => {
    res.send(JSON.stringify(users))
  })
})
app.post('/post', (req, res) => {
  console.log('req update', req.body)
  if (req.body.mode === 'newpost') {
    Post.create(req.body)
    res.send({ok: true})
  } else if (req.body.mode === 'homepage') {
    User.findOneAndUpdate({name: req.body.author}, {homeInfo: req.body.title + '\n' + req.body.body, homeImg: req.body.img}, {new: true}, (err, user) => {
      if (err) res.send({ok: false})
      else res.send({ok: true})
    })
  } else {
    Post.findByIdAndUpdate(req.body.mode, {...req.body, mode: undefined}, {new: true}, (err, post) => {
      if (err) res.send({ok: false})
      else res.send({ok: true})
    })
  }
})

server.listen(config.PORT, () => {
  console.log('Server running on port:', config.PORT)
})
