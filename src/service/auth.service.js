const userModel = require("../model/userModel");
const CryptoJS = require("crypto-js");

const jwtUtils= require('../utils/jwt'); 

module.exports = {
  login: (user) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(user.email && user.password){
                const User = await userModel.findOne({email:user.email});
                if(User){
                    const bytes = CryptoJS.AES.decrypt(User.password,process.env.CRYPTO_SECRET); 
                    const originPassword = bytes.toString(CryptoJS.enc.Utf8);
                    if(originPassword === user.password){
                        const data = {
                            userId:User._id,
                            isAdmin:User.isAdmin
                        }

                        const accessToken = jwtUtils.signToken(data); 
                        const refreshToken = jwtUtils.refreshToken(data); 

                        if(accessToken && refreshToken){
                            resolve({
                                success:true, 
                                User,
                                accessToken,
                                refreshToken,
                                message:'login success !'
                            })
                        }
                    }else{
                      reject({
                        success:false,
                        message:"password incorrect !"
                      })
                    }
                }else{
                  reject({
                    success:false, 
                    message:'user not exist !'
                })
                }
            }else{
                reject({
                    success:false, 
                    message:'user not exist !'
                })
            }
        } catch (error) {
             reject({
                success:false,
                message:error.message
             })
        }
    });
  },

  register: (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userExist = await userModel.findOne({email:user.email}); 
        if(userExist){
          resolve({
            success:false, 
            code:403,
            message:"email is exist"
          })
          return; 
        }
        if (user.email && user.password && user.username) {
          const hashPassword = CryptoJS.AES.encrypt(
            user.password,
            process.env.CRYPTO_SECRET
          ).toString();
          user.password = hashPassword;
          const User = new userModel(user);
          const newUser = await User.save();
          resolve({
            newUser,
            success: true,
            message: "register success",
          });
        }
      } catch (error) {
        reject({
          success: false,
          message: error,
        });
      }
    });
  },
};
