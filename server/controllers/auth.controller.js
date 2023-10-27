import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import {
  ErrorHandler,
  handleGlobalError,
  handleMongoError,
} from "../utils/error.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User Created Successfully" });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      const mongoError = handleMongoError(error);
      return next(mongoError);
    }
    const globalError = handleGlobalError(error);
    return next(globalError);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      next(new ErrorHandler(400, "Both the fields are required"));
      return;
    }
    const validUser = await User.findOne(
      { email: email },
      { createdAt: 0, __v: 0, updatedAt: 0 }
    );
    if (!validUser) {
      next(new ErrorHandler(404, "User not found"));
      return;
    }
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      next(new ErrorHandler(401, "Invalid Credentials"));
      return;
    }
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
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const generateToken = async (req, res, next) => {
  try {
    const cookies = req.cookies.refreshToken;
    if (!cookies) {
      return next(new ErrorHandler(401, "Unauthorized Access"));
    }
    const decoded = await jwt.verify(cookies, process.env.REFRESH_SECRET);
    const token = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "user logout successfully" });
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn, google, generateToken, logoutUser };
