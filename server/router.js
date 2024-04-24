 const Controller = require('./controllers/controller')

const router = require('express').Router()
const { authentication } = require('./middlewares/authentication');
const {godOnly} = require('./middlewares/godOnly')

router.get('/', (req, res) => {
    res.send('RUNNING!')
  })

router.post('/login', Controller.login)
router.post('/login/google', Controller.googleLogin)
router.post('/register', Controller.register)
router.get('/images', Controller.images)

router.get('/post', authentication, Controller.post)
router.post('/post', authentication, Controller.addPost)
router.get('/post/top5', authentication, Controller.top5Post)
router.get('/post/follow', authentication, Controller.postByCategory)
router.get('/post/:id', authentication, Controller.postById)
router.delete('/post/:id', authentication, godOnly, Controller.deletePost)
router.put('/post/:id/vote', authentication, Controller.votePost)
router.get('/category', authentication, Controller.allCategory)
router.get('/category/:id', authentication, Controller.postCategory)
router.post('/category/:id/follow', authentication, Controller.addFollow)
router.delete('/category/:id/follow', authentication, Controller.deleteFollow)
router.get('/comment/:id', authentication, Controller.comment)
router.post('/comment/:id', authentication, Controller.addComment)
router.get('/user', authentication, Controller.user)
router.put('/user/:id', authentication, Controller.editUser)

module.exports = router