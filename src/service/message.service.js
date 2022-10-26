
const Message = require('../model/messageModel')


module.exports = {
    create:(data)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const Msg = new Message(data); 
                const message = await Msg.save(); 
                resolve({
                    success:true, 
                    message
                })          
            } catch (error) {
                reject({
                    success:false, 
                    data:error.message
                })
            }
        })
    },

    getCommentByTwoUser:({from,to})=>{

    

        return new Promise(async(resolve,reject)=>{
            try {
                const msg  = await Message.find({$or:[
                    {
                        from:from, 
                        to:to
                    }, 
                    {
                        from:to, 
                        to:from
                    }
                  ]}).sort({
                     createdAt:1
                  })
                resolve({
                    success:true, 
                    msg
                })
            } catch (error) {
                reject({
                    success:false,
                    data:error
                })
            }
        })
    }
}