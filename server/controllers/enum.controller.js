const Enum = require("../models/enum.model.js")
const { asyncErrorHandler } = require("../utils/error/errorHelpers.js");
const { enumConstConverter, enumConverter } = require("../utils/helper/enumHelpers.js");

const getAllEnums=asyncErrorHandler(async(req,res)=>{
    const enums=await Enum.find({},{__v:0});
    const converted=enumConverter(enums);
    const convertedConst=enumConstConverter(enums);
    return res.status(200).json({enums:converted,enumsConst:convertedConst});
})

module.exports={getAllEnums};
