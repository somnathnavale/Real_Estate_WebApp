const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true,"username is required field"],
      trim:true,
      maxlength:[20,"username is longer than expected"],
      unique: true,
    },
    fullname: {
      type: String,
      trim:true,
      maxlength: [40, "full Name is longer than expected"],
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
    mobileNo:{
      type:Number,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: 'Please provide a valid 10-digit mobile number.',
      },
      unique:true,
      sparse:true  //allowing multiple null values in db for unique fields otherwise mongodb consider them duplicates 
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

module.exports= User;
