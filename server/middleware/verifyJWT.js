import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/error.js";

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer "))
    next(new ErrorHandler(401, "Unauthorized Access"));

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) next(new ErrorHandler(403, "Forbidden Access"));
    req.user = user;
    next();
  });
};

export default verifyJWT;
