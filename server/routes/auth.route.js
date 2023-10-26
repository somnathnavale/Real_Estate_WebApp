import express from "express";
import {
  signUp,
  signIn,
  google,
  generateToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", google);
router.get("/token", generateToken);

export default router;
