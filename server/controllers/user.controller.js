import User from "../models/user.model.js";
import { ErrorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(new ErrorHandler(401, "Not Allowed To Update Data"));
  try {
    const allowedFields = ["username", "email", "avatar", "password"];
    let obj = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) obj[field] = req.body[field];
    });

    if (obj.password) {
      obj.password = bcryptjs.hashSync(obj.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, obj, {
      new: true,
      select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 },
    });
    return res.status(200).json({ ...updatedUser._doc });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res) => {
  if (req.user.id !== req.params.id)
    return next(new ErrorHandler(401, "Not Allowed To Update Data"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "account deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { updateUser, deleteUser };
