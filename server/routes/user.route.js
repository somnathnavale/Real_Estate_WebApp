import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.put("/update/:id", verifyJWT, updateUser);
router.delete("/delete/:id", verifyJWT, deleteUser);

export default router;
