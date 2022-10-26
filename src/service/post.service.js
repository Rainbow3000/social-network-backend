const Post = require("../model/postModel");
const User = require("../model/userModel");
const Comment = require("../model/commentModel");
module.exports = {
  create: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newPost = new Post(data);
        const post = await newPost.save();
        if (post) {
          resolve({
            code: 200,
            success: true,
            post,
          });
        }
      } catch (error) {
        reject({
          code: 500,
          success: false,
          post: error.message,
        });
      }
    });
  },

  get_list: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const comments = await Comment.find({}).sort({
          createdAt:-1
        });
        const posts = await Post.find({}).sort({ time: -1 });
        const users = await User.find({});

        const postAndUserAndComment = posts.map((item) => {
          const newObj = {};
          const userPost = users.find(
            (user) =>
              JSON.stringify(user._id).slice(
                1,
                JSON.stringify(user._id).length - 1
              ) ===
              JSON.stringify(item.userId).slice(
                1,
                JSON.stringify(item.userId).length - 1
              )
          );

          const commentPost = comments.filter((comment) => {
            return (
              JSON.stringify(comment.postId).slice(
                1,
                JSON.stringify(comment.postId).length - 1
              ) ===
              JSON.stringify(item._id).slice(
                1,
                JSON.stringify(item._id).length - 1
              )
            );
          });

          if (commentPost) {
            const mixComment = commentPost.map((element) => {
              const ownUser = users.find(
                (item) =>
                  JSON.stringify(item._id).slice(
                    1,
                    JSON.stringify(item._id).length - 1
                  ) ===
                  JSON.stringify(element.userId).slice(
                    1,
                    JSON.stringify(element.userId).length - 1
                  )
              );
              if (ownUser) {
                const { _id, username, avatar } = ownUser._doc;
                element._doc.ownUser = { _id, username, avatar };
              }
              return element;
            });
            newObj.comment = mixComment.slice(0,2);
          }
          if (userPost) {
            const { password, isAdmin, ...rest } = userPost._doc;
            newObj.post = item;
            newObj.user = rest;
          }
          return newObj;
        });

        if (postAndUserAndComment) {
          resolve({
            code: 200,
            success: true,
            post: postAndUserAndComment,
          });
        }
      } catch (error) {
        reject({
          code: 200,
          success: false,
          post: error.message,
        });
      }
    });
  },
  get_list_by_userId: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ _id: userId });
        const posts = await Post.find({}).sort({ time: -1 });
        const newPosts = [];
        if (user) {
          const newObj = {};
          posts.forEach((item) => {
            if (
              JSON.stringify(item.userId).slice(
                1,
                JSON.stringify(item.userId).length - 1
              ) ===
              JSON.stringify(user._id).slice(
                1,
                JSON.stringify(user._id).length - 1
              )
            ) {
              const { password, isAdmin, ...rest } = user._doc;

              newObj.post = item;
              newObj.user = rest;
              newPosts.push(newObj);
            }
          });
          resolve({
            code: 200,
            success: true,
            post: newPosts,
          });
        }
      } catch (error) {
        reject({
          code: 200,
          success: false,
          post: error.message,
        });
      }
    });
  },
  delete_post: (postId,userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const postExist = await Post.findOne({
            _id:postId, 
            userId
        })
        if(!postExist){
          resolve({
            success:false, 
            message:"you are don't allow to do that !"
          })
          return; 
        }
        const post = await Post.findByIdAndDelete({_id:postId}); 
        resolve({
          code: 200,
          success: true,
          postId:post._id,
          message:"delete post success !"
        });
      } catch (error) {
        reject({
          code: 200,
          success: false,
          post: error.message,
        });
      }
    });
  },
};
