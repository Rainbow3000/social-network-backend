
const Post = require('../model/postModel'); 
const Like = require('../model/likeModel'); 



module.exports = {
    create:(data)=>{

        return new Promise(async(resolve,reject)=>{
            try {
                const likeExist = await Like.findOne({
                    userId:data.userId,
                    postId:data.postId
                })

                if(likeExist){
                    await Like.findByIdAndDelete({
                        _id:likeExist._id
                    })
                   const postExist = await Post.findOne({
                    _id:data.postId
                   })
                   if(postExist){      
                        await Post.findByIdAndUpdate({_id:postExist._id},{
                            likeNumber:postExist.likeNumber  - 1                            
                        })
                        const like = await Like.find({userId:data.userId}); 
                        
                        resolve({
                            success:true,
                            message:"unlike success",
                            like
                        })
                   }else{
                    reject({
                        success:false, 
                        message:"post is not exist !"
                    })
                   }
                }else{
                    const myLike = new Like(data); 
                    await myLike.save();                   
                    const post = await Post.findById({_id:data.postId})
                    if(post){
                        await Post.findByIdAndUpdate({_id:post._id},{
                            likeNumber: post.likeNumber + 1
                        })
                        const like = await Like.find({userId:data.userId}); 
                        resolve({
                            success:true,
                            message:"like success",
                            like
                        })
                    }
                }            
            } catch (error) {
                reject({
                    success:false, 
                    data:error.message
                })
            }
        })
    },

    getLikeByUser:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const like = await Like.find({userId}); 
                resolve({
                    success:true,
                    like
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