const express = require('express'); 
const router = express.Router(); 
const {verifyToken} = require('../utils/verifyToken')
const messageController = require('../controller/message.controller')

router.get('/',verifyToken,messageController.getCommentByTwoUser)
router.post('/',verifyToken,messageController.create)
router.put('/:id')
router.delete('/',verifyToken)


module.exports  = router;