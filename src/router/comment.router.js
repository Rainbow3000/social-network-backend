const express = require('express'); 
const router = express.Router(); 
const {verifyToken} = require('../utils/verifyToken')
const commentController = require('../controller/comment.controller')

router.get('/',verifyToken,)
router.post('/',verifyToken,commentController.createComment)
router.put('/:id')
router.delete('/',verifyToken,commentController.delComment)


module.exports  = router;