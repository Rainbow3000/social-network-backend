const authService = require("../service/auth.service");

module.exports = {
  login: async (req, res, next) => {
    try {
      const response = await authService.login(req.body);
      if (response.success) {
        res.status(200).json({
          success: true,
          username: response.User.username,
          userId: response.User.id,
          avatar: response.User.avatar,
          message: response.message,
          accesstoken: response.accessToken,
          refreshtoken: response.refreshToken,
        });
      }
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
    }
  },
  register: async (req, res, next) => {
    try {
      const user = await authService.register(req.body);
      if (user.success) {
        res.status(200).json(user);
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(200).json(error);
    }
  },
};
