import express from "express";
import { getAllEnums } from "../controllers/enum.controller.js";

const router=express.Router();

router.get("/",getAllEnums);

export default router;