if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}
const { User, Post, Comment, Category, Follow } = require('./models')

const cors = require('cors');
const express = require('express');
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');

const app = express()
const port = process.env.PORT || 3000

const { createServer } = require('http')
const { Server } = require("socket.io")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors())
app.use(router)
app.use(errorHandler)

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

io.on('connection', (socket) => {
  console.log("access token >>>>>>>>>>>>>>>>>>", socket.handshake.auth.access_token);

  socket.on("new-post", async () => {
    try {
      const allPost = await Post.findAll({ attributes: { exclude: ['UserId'] }, order: [['votes', 'DESC']] })
      socket.broadcast.emit("post-new", allPost)
    } catch (error) {
      console.log(error);
    }
  })

  socket.on("new-comment", async (PostId) => {
    try {
      const comment = await Comment.findAll({
        where: {
          PostId
        },
        include: [
          {
            model: Comment,
            attributes: ['author', 'content'],
            as: 'Quote'
          }
        ]
      })
      socket.broadcast.emit("comment-new", comment)
    } catch (error) {
     console.log(error); 
    }
      
  })
      
      
  socket.on('new-vote', async()=>{
    try {
      const allPost = await Post.findAll({attributes: { exclude: ['UserId'] }, order:[['votes', 'DESC']]})
      socket.broadcast.emit("vote-new", allPost)
    } catch (error) {
      console.log(error);
    }
  })

      // io.use(async (socket, next) => {
  //   if(!socket.handshake.auth.access_token) throw { name: "unauthenticated" }

  //       const token = socket.handshake.auth.access_token

  //       const payload = verifyToken(token)

  //       const findUser = await User.findByPk(payload.id)
  //       if(!findUser) throw { name: "unauthenticated" }

  //       useridddd = payload.id
  //     });
  //     next();
})


// app.listen(port, () => {
//   console.log(`RUNNNNNNNNIIIINNNNGGGGGG on port ${port}`)
// })

httpServer.listen(port, () => console.log(`RUNNNNNNNNIIIINNNNGGGGGG on port ${port}`))

module.exports = app