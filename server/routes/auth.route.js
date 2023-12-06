const express = require("express");

const {
  signUp,
  signIn,
  google,
  generateToken,
  logoutUser,
  forgotPasswordHandler
} = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", google);
router.get("/token", generateToken);
router.get("/logout", logoutUser);
router.post("/forgot-password", forgotPasswordHandler);

module.exports=router;
