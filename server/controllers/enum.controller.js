import Enum from "../models/enum.model.js"
import { enumConverter } from "../utils/helper/enumHelpers.js";

export const getAllEnums=async(req,res,next)=>{
    try {
        const enums=await Enum.find({},{__v:0});
        const converted=enumConverter(enums);
        return res.status(200).json({enums:converted});
    } catch (error) {
        next(error)
    }
}


