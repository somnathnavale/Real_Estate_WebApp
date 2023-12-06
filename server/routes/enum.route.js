const express =require("express");
const { getAllEnums } =require("../controllers/enum.controller.js");

const router=express.Router();

router.get("/",getAllEnums);

module.exports = router;