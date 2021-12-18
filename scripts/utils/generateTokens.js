const jwt = require('jsonwebtoken')

const generateJWTAccessToken = (user) =>{
  return jwt.sign(user.toObject(),process.env.ACCESS_TOKEN_SECRET_KEY)
}

const generateJWTRefreshToken = (user) =>{
    return jwt.sign(user.toObject(),process.env.REFRESH_TOKEN_SECRET_KEY)
}

module.exports={
    generateJWTAccessToken,
    generateJWTRefreshToken
}