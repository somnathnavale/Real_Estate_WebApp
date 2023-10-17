import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password,12);
    const newUser=new User({username,email,password:hashedPassword});
    try {
        await newUser.save();
        res.status(201).json({success:true,message:"User Created Successfully"});
    } catch (error) {
        next(error);
    }
} 

const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    try {
        if(!email || !password){
            throw errorHandler(400,"Both the fields are required");
        }
        const validUser=await User.findOne({email:email});
        if(!validUser){
            throw errorHandler(404,"User not found");
        }
        const validPassword=await bcryptjs.compare(password,validUser.password);
        if(!validPassword)
            throw errorHandler(401, "Invalid Credentials")
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);

        const {password:pass,...userInfo}=validUser._doc;
        res.cookie('access_token',token,{httpOnly:true});
        res.status(200).json({user:userInfo});
    } catch (error) {
        next(error);
    }
}

export {signup,signin};

