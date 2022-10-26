
const Post = require("../model/postModel");
const Comment = require('../model/commentModel')
const User = require('../model/userModel')


module.exports = {
    createComment:(data)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const commentModel = new Comment(data); 
                const comment = await commentModel.save(); 
                const user = await User.findById({_id:comment.userId})
                const {password,...rest} = user._doc; 
                comment._doc.ownUser = rest; 
                if(comment){
                    const post = await Post.findById({_id:comment.postId}); 
                    await Post.findOneAndUpdate({_id:data.postId},{
                        commentNumber: post.commentNumber + 1
                    })
                    resolve({
                        success:true, 
                        comment, 
                        message:"comment success !"
                    })
                }
            } catch (error) {
                reject({
                    success:false, 
                    message:error.message
                })
            }
        })
    },

    delComment:(data)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const commentDel = await Comment.findById({_id:data.commentId}); 
                if(commentDel){
                    let count = 0; 
                    const idComments = await commentDel.find({parentId:commentDel._id}); 
                    await Comment.findByIdAndDelete({_id:data.commentDel._id}); 
                    idComments.forEach(async element=>{
                        count = count + 1; 
                        await Comment.findByIdAndDelete({_id:element._id});
                    }) 
                    
                    await Post.findByIdAndUpdate({_id:commentDel.postId},{
                        commentNumber: $commentNumber - count
                    })

                    resolve({
                        success:true, 
                        message:"comment has been deleted !" 
                    })
                }
            } catch (error) {
                reject({
                    success:false, 
                    message:error.message
                })
            }
        })
    }
}

