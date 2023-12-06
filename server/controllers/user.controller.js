const User = require("../models/user.model.js");
const Listing = require("../models/listing.model.js");
const bcryptjs = require("bcryptjs");
const CustomError = require("../utils/error/CustomError.js");
const { asyncErrorHandler } = require("../utils/error/errorHelpers.js");

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

module.exports = { updateUser, deleteUser };
