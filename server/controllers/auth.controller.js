const bcryptjs = require("bcryptjs");
const User = require("../models/user.model.js");
const CustomError = require("../utils/error/CustomError.js");
const Token = require("../models/token.model.js");
const jwt = require("jsonwebtoken");
const { asyncErrorHandler } = require("../utils/error/errorHelpers.js");
const { forgotPasswordEmail, userRegistrationEmail } = require("../services/email.service.js");

const signUp = asyncErrorHandler(async (req, res) => {
  const { password, ...other} = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({password: hashedPassword ,...other});
  await newUser.save();
  await userRegistrationEmail(newUser?.email,newUser?.fullname || newUser?.username || newUser?.email )
  res.status(201).json({ success: true, message: "User Created Successfully" });
});

const signIn = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;
 
  if (!email || !password) throw new CustomError("email and password are required", 400);

  const validUser = await User.findOne(
    { email: email },
    { createdAt: 0, __v: 0, updatedAt: 0 }
  );

  if (!validUser) throw new CustomError("User not found", 404);

  const validPassword = await bcryptjs.compare(password, validUser.password);
  if (!validPassword) throw new CustomError("Invalid Credentials",401);

  const { password: pass, ...userInfo } = validUser._doc;

  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(
    { id: validUser._id },
    process.env.REFRESH_SECRET,
    { expiresIn: "1d" }
  );

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({ ...userInfo, accessToken: token });
});

const google = asyncErrorHandler(async (req, res) => {
  const { email, photo, name } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
    const username =
      name.split(" ").join("").toLowerCase() +
      Math.random().toString(36).slice(-4);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      avatar: photo,
    });
    await newUser.save();
    user = newUser;
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const { password, ...userInfo } = user._doc;
  res.cookie("access_token", token, { httponly: true });
  res.status(200).json({ user: userInfo });
});

const generateToken = asyncErrorHandler(async(req, res, next) => {
  const cookies = req.cookies.refreshToken;
  if (!cookies) {
    throw new CustomError("Unauthorized Access", 401);
  }
  const decoded = jwt.verify(cookies, process.env.REFRESH_SECRET);
  const token = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const user=await User.findById(decoded.id,{__v:0,password:0,createdAt:0,updatedAt:0});
  return res.status(200).json({ accessToken:token,...user._doc });
});

const logoutUser = asyncErrorHandler((req, res, next) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "user logout successfully" });
});

const forgotPasswordHandler=(req,res,next)=>{
  const STEPS={
    SENDOTP:"SENDOTP",
    VERIFYOTP:"VERIFYOTP",
    UPDATEPASSWORD:"UPDATEPASSWORD"
  }

  const {step}=req.query;
  if(step==STEPS.SENDOTP)
    return forgotPassword(req,res,next);
  else if(step==STEPS.VERIFYOTP)
    return verifyOTP(req,res,next);
  else if(step===STEPS.UPDATEPASSWORD)
    return updatePassword(req,res,next);
  return res.status(400).json({message:"Bad Request"}); 
}

const forgotPassword = asyncErrorHandler(async(req, res, next) => {
  const {email}=req.body;
  if(!email)
    throw new CustomError("Please provide email address",400);

    const user=await User.findOne({email})
  if(!user)
    throw new CustomError("No User with given email present, please consider registering first",400)

  const otp=Math.floor(100000 + Math.random() * 900000)

  const newToken=new Token({userId:user._id,otp});
  await newToken.save();

  res
    .cookie("tokenId", newToken._id, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 15 * 60 * 1000,
    })
  
  const emailResponse=await forgotPasswordEmail(email,otp);
  
  if(emailResponse?.success){
    return res.status(200).json({ message: "OTP Sent Successfully" });
  }else{
    throw new CustomError("Something Went Wrong",500);
  }

});

const verifyOTP=asyncErrorHandler(async(req,res,next)=>{
  const {otp}=req.body;
  if(!otp)
    throw new CustomError("Please provide OTP",400);
  
  const tokenId = req.cookies?.tokenId;
  if (!tokenId)
    throw new CustomError("OTP expired, consider sending it agian", 400);
  
  const matchedToken=await Token.findById(tokenId);
  if(!matchedToken)
    throw new CustomError("OTP expired, consider sending it again", 400);
  
  if(parseInt(matchedToken?.otp)!==parseInt(otp))
    throw new CustomError("incorrect OTP entered", 400);

  await Token.findByIdAndDelete(tokenId);

  res.clearCookie("tokenId");
  res
    .cookie("userId", matchedToken.userId, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 15 * 60 * 1000,
    })
  
  res.status(200).json({message:"OTP verified Successfully, Now update password"});
})

const updatePassword=asyncErrorHandler(async(req,res,next)=>{
  const {password}=req.body;
  if(!password)
    throw new CustomError("Please provide password",400);
  
  const userId = req.cookies?.userId;
  if (!userId)
    throw new CustomError("OTP expired, consider sending it again", 400);
  
  const hashedPassword=bcryptjs.hashSync(password, 10)
  const user=await User.findByIdAndUpdate(userId,{password:hashedPassword},{runValidators:true});
  res.status(200).json({message:"Password Successfully Updated"});
})

module.exports = { signUp, signIn, google, generateToken, logoutUser,forgotPasswordHandler};
