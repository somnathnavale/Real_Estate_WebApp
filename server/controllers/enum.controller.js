import Enum from "../models/enum.model.js"
import CustomError from "../utils/error/CustomError.js";
import { asyncErrorHandler } from "../utils/error/errorHelpers.js";
import { enumConverter } from "../utils/helper/enumHelpers.js";

export const getAllEnums=asyncErrorHandler(async(req,res)=>{
    const enums=await Enum.find({},{__v:0});
    const converted=enumConverter(enums);
    return res.status(200).json({enums:converted});
})


