const express = require('express'); 
const router = express.Router(); 

const userController = require('../controller/user.controller'); 
const {verifyToken} = require('../utils/verifyToken')

router.get('/',userController.get_list)
router.get('/userByUsername',userController.get_user_by_username)
router.get('/userStat',userController.userStat);
router.get('/:id',verifyToken,userController.get_by_id)
router.get('/getUser/:id',verifyToken,userController.get_one)
router.put('/profile',verifyToken,userController.update_profile_user)
router.put('/avatar',verifyToken,userController.update_avatar_user)
router.put('/',verifyToken,userController.update_image_cover)
router.delete('/:id')


module.exports  = router;