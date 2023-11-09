import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import { getAllEnums } from "../controllers/enum.controller.js";

const router=express.Router();

router.get("/",verifyJWT,getAllEnums);

export default router;