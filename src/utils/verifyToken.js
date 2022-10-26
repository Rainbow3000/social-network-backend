const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    try {
      if (!req.headers.token) {
        res.status(200).json({
          code: 401,
          success: false,
          message: "you are unauthenticate !",
        });
      }

      const token = req.headers.token.split(" ")[1];
      
      if (!token) {
        res.status(200).json({
          code: 401,
          success: false,
          message: "you are unauthenticate !",
        });
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          res.status(200).json({
            success: false,
            code: 401,
            message: err.message,
          });
          return;
        }
        if (user || user.isAdmin) {
          req.user = user;
          next();
        } else {
          console.log("err", err);
          res.status(200).json({
            code: 401,
            message: "you are unauthenticate !",
          });
        }
      });
    } catch (error) {}
  },
};
