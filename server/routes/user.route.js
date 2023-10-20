import express from "express";
import {updateUser} from '../controllers/user.controller.js';
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router();

router.get("/",(req,res)=>res.send("hello"));
router.put("/update/:id",verifyToken,updateUser);

export default router;