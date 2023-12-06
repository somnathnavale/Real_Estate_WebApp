const jwt = require("jsonwebtoken");
const CustomError = require("../utils/error/CustomError.js");

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader?.startsWith("Bearer ")){
    return next(new CustomError("Unauthorized Access",401));
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new CustomError("Forbidden Access",403));
    req.user = user;
    next();
  });
};

module.exports = verifyJWT;
