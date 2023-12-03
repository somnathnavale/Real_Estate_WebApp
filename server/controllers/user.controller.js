import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import CustomError from "../utils/error/CustomError.js";
import { asyncErrorHandler } from "../utils/error/errorHelpers.js";
import Listing from "../models/listing.model.js";

const updateUser = asyncErrorHandler(async (req, res) => {
  if (req.user.id !== req.params.id)
    throw new CustomError("Not Allowed To Update Data", 401);

  const allowedFields = ["username", "email", "avatar", "password","mobileNo","fullname"];
  let obj = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) obj[field] = req.body[field];
  });

  if (obj.password) {
    obj.password = bcryptjs.hashSync(obj.password, 10);
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, obj, {
    new: true,
    runValidators: true,
    select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 },
  });

  if(!updatedUser)
    throw new CustomError('User With Given Id Not Found',404);

  return res.status(200).json({ ...updatedUser._doc });
});

const deleteUser = asyncErrorHandler(async (req, res) => {
  if (req.user.id !== req.params.id)
    throw new CustomError("Not Allowed To Update Data", 401);

  const user = await User.findByIdAndDelete(req.params.id);
  if(!user)
    throw new CustomError('User With Given Id Not Found',404);
  await Listing.deleteMany({owner:req.user.id});
  res.clearCookie("refreshToken");
  res.clearCookie("userId");
  res.clearCookie("tokenId");
  res.status(200).json({ message: "account deleted successfully" });
});

export { updateUser, deleteUser };
