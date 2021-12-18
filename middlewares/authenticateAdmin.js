const JWT = require('jsonwebtoken')
const httpStatus = require('http-status')

const authenticateAdmin = (req,res,next) =>{
const token = req.headers?.token;
  if (!token) return res.status(httpStatus.UNAUTHORIZED).send({ message: "Token should be given." });
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) return res.status(httpStatus.FORBIDDEN).send(err);
    if (!user?.isAdmin) return res.status(httpStatus.UNAUTHORIZED).send({ message: "Please login as an admin" });
    req.user = user;
    next();
  });
}

module.exports = {
    authenticateAdmin
}