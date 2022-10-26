
const messageService = require('../service/message.service')

module.exports = {
    create:async(req,res,next)=>{
        try {
            req.body.from = req.user.userId; 
            const Message = await messageService.create(req.body); 
            if(Message.success){
                res.status(200).json(Message)
            }
        } catch (error) {
            res.status(200).json(error)
        }
    },
    getCommentByTwoUser:async(req,res,next)=>{
        const from  = req.user.userId; 
        const to = req.query.to;
        try {
            const Message = await messageService.getCommentByTwoUser({from,to}); 
            if(Message.success){
                res.status(200).json(Message)
            }
        } catch (error) {
            res.status(200).json(error)
        }
    }

    
}