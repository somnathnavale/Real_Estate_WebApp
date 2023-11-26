import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import CustomError from "../utils/error/CustomError.js";
import { asyncErrorHandler } from "../utils/error/errorHelpers.js";

const signUp = asyncErrorHandler(async (req, res) => {
  const { password, ...other} = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({password: hashedPassword ,...other});
  await newUser.save();
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

const generateToken = asyncErrorHandler((req, res, next) => {
  const cookies = req.cookies.refreshToken;
  if (!cookies) {
    throw new CustomError("Unauthorized Access", 401);
  }
  const decoded = jwt.verify(cookies, process.env.REFRESH_SECRET);
  const token = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.status(200).json({ token });
});

const logoutUser = asyncErrorHandler((req, res, next) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "user logout successfully" });
});

export { signUp, signIn, google, generateToken, logoutUser };
