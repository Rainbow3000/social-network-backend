
const LikeService = require('../service/like.service')

module.exports = {
    create:async(req,res,next)=>{
        try {
            req.body.userId = req.user.userId; 
            const like = await LikeService.create(req.body); 
            if(like.success){
                res.status(200).json(like)
            }
        } catch (error) {
            res.status(200).json(error)
        }
    },
    getLikeByUser:async(req,res,next)=>{
        try {
            const like = await LikeService.getLikeByUser(req.user.userId); 
            if(like.success){
                res.status(200).json(like)
            }
        } catch (error) {
            res.status(200).json(error)
        }
    }

    
}