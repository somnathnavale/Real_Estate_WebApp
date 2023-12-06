const express = require("express");
const { updateUser, deleteUser } = require("../controllers/user.controller.js");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.put("/update/:id", verifyJWT, updateUser);
router.delete("/delete/:id", verifyJWT, deleteUser);

module.exports = router;
