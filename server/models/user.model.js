import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true,"username is required field"],
      unique: true,
    },
    email: {
      type: String,
      required: [true,"email is required field"],
      unique: true,
    },
    password: {
      type: String,
      required: [true,"password is required field"],
    },
    contactNumber:{
      type:Number,
      min:[1000000000,"provide correct mobile number"],
      max:[9999999999,"provide correct mobile number"]
    },
    avatar: {
      type: String,
      default:
        "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/user-male-circle-blue-512.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
