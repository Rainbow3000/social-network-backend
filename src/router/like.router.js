const express = require('express'); 
const router = express.Router(); 
const {verifyToken} = require('../utils/verifyToken')
const likeController = require('../controller/like.controller')

router.get('/byUserId',verifyToken,likeController.getLikeByUser)
router.post('/',verifyToken,likeController.create)
router.get('/:id',)
router.put('/:id',verifyToken)


module.exports  = router;