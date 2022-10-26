const postService = require("../service/post.service");
module.exports = {
  create: async (req, res, next) => {
    try {
      if (!req.user) {
        res.status(200).json({
          success:false,
          message: "you are unauthenticate !",
        });
      }
      req.body.userId = req.user.userId;
      const post = await postService.create(req.body);
      if (post.success) {
        res.status(200).json(post);
      }
    } catch (error) {
      res.status(200).json(error);
    }
  },
  get_list: async (req, res, next) => {
    try {
      const post = await postService.get_list({});
      if (post.success) {
        res.status(200).json(post);
      }
    } catch (error) {
      res.status(200).json(error);
    }
  },
  get_list_by_userId: async (req,res,next) => {
    try {
      const post = await postService.get_list_by_userId(req.params.id);
      
      if (post.success) {
        res.status(200).json(post);
      }
    } catch (error) {
      res.status(200).json(error);
    }
  },

  delete_post: async (req,res,next) => {
    try {
      const post = await postService.delete_post(req.params.id,req.user.userId);
      
      if (post.success) {
        res.status(200).json(post);
      }
    } catch (error) {
      res.status(200).json(error);
    }
  },

};
