const express = require('express'); 
const router = express.Router(); 
const {verifyToken} = require('../utils/verifyToken')
const postController = require('../controller/post.controller')

router.get('/',postController.get_list)
router.post('/',verifyToken,postController.create)
router.get('/:id',verifyToken,postController.get_list_by_userId )
router.delete('/:id',verifyToken,postController.delete_post)


module.exports  = router;