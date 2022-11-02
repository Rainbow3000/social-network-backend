
const userService = require('../service/user.service')

module.exports = {
    get_list:async(req,res,next)=>{
        try {
            const user = await userService.get_list(); 
            if(user.success){
                res.status(200).json(user)
            }
        } catch (error) {
            res.status(200).json({
                code:500, 
                error
            })
        }
    },
    get_user_by_username:async(req,res,next)=>{
      try {
        const username = req.query.username; 
        if(!username){
          res.status(200).json({
            success:false,
            message:"Truy vấn không chính xác"
          })
          return; 
        }
          const user = await userService.get_user_by_username(username); 
          if(user.success){
              res.status(200).json(user)
          }
      } catch (error) {
          res.status(200).json({
              code:500, 
              error
          })
      }
  },
    get_one:async(req,res,next)=>{
      const userId = req.params.id; 
        try {
            const user = await userService.get_one(userId);      
            if(user.success){
                res.status(200).json(user)
            }
        } catch (error) {
            res.status(200).json({
                code:500, 
                error
            })
        }
    },
    update_image_cover: async (req,res,next) => {
       
        try {
          const user = await  userService.update_image_cover(req.user.userId,req.body.avatar);
          if (user.success) {
            res.status(200).json(user);
          }
        } catch (error) {
          res.status(200).json(error);
        }
      },
      update_profile_user: async (req,res,next) => {
        try {
          const user = await  userService.update_profile_user(req.user.userId,req.body);
          if (user.success) {
            res.status(200).json(user);
          }
        } catch (error) {
          res.status(200).json(error);
        }
      },

      update_avatar_user: async (req,res,next) => {
        try {
          const user = await  userService.update_avatar_user(req.user.userId,req.body.avatar);
          if (user.success) {
            res.status(200).json(user);
          }
        } catch (error) {
          res.status(200).json(error);
        }
      },

      get_by_id: async (req,res,next) => {
        try {
          const user = await  userService.get_by_id(req.params.id);
          if (user.success) {
            res.status(200).json(user);
          }
        } catch (error) {
          res.status(200).json(error);
        }
      },
      userStat:async(req,res,next)=>{
        try {
            const user = await userService.userStat(); 
            res.status(200).json(user); 
        } catch (error) {
            res.status(500).json(error); 
        }
    }
}