const express = require('express'); 

const router = express.Router(); 

const authRouter = require('./auth.router'); 
const userRouter = require('./user.router'); 
const postRouter = require('./post.router')
const likeRouter = require('./like.router')
const commentRouter = require('./comment.router')
const messageRouter = require('./message.router')

router.use('/auth',authRouter); 
router.use('/user',userRouter); 
router.use('/post',postRouter)
router.use('/like',likeRouter)
router.use('/comment',commentRouter)
router.use('/message',messageRouter)


module.exports = router

