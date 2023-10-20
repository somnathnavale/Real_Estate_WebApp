import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;

    if(!token) return new Error(errorHandler(401,"Unauthorized"));
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(403,"forbidden"));

        req.user=user;
        next();
    })

}