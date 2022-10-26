const commentService = require("../service/comment.service");

module.exports = {
  createComment: async (req, res, next) => {
    req.body.userId = req.user.userId;
    try {
      req.body.userId = req.user.userId;
      const comment = await commentService.createComment(req.body);
      if (comment.success) {
        res.status(200).json(comment);
      }
    } catch (error) {
      res.status(200).json(error);
    }
  },
  delComment: async (req, res, next) => {
    req.body.userId = req.user.userId;
    try {
      req.body.userId = req.user.userId;
      const comment = await commentService.delComment(req.body);
      if (comment.success) {
        res.status(200).json(comment);
      }
    } catch (error) {
      res.status(200).json(error);
    }
  },
};
