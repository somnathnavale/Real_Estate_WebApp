import express from "express";
import {
  signUp,
  signIn,
  google,
  generateToken,
  logoutUser,
  forgotPasswordHandler
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", google);
router.get("/token", generateToken);
router.get("/logout", logoutUser);
router.post("/forgot-password", forgotPasswordHandler);

export default router;
