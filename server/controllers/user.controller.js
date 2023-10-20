import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

const updateUser=async(req,res,next)=>{
    if(req.user.id!==req.params.id)
        return next(errorHandler(401,"Not Allowed To Update Data"));
    try {
        let { username,password,email,image}=req.body;
        if(password){
            password=bcryptjs.hashSync(password,10);
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{
            $set:{
                password,image,email,username 
            }
        },{new:true});
        const {password:newPass,...userInfo}=updatedUser._doc;
        return res.status(200).json(userInfo);
    } catch (error) {
        next(error);
    }
}

export {updateUser};