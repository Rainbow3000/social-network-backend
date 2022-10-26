
const jwt = require('jsonwebtoken')


module.exports = {
    signToken: (data)=>{
        return jwt.sign(data,process.env.JWT_SECRET,{expiresIn:'1d'})
    },
    refreshToken:(data)=>{
        return jwt.sign(data,process.env.JWT_REFRESH_SECRET,{expiresIn:'7d'})
    }
}