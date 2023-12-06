const mongoose = require("mongoose");

const tokenSchema=new mongoose.Schema({
    userId:{
        type :mongoose.Schema.Types.ObjectId,
        required: [true,"user Id is required field"],
        ref:"User"
    },
    otp:{
        type:Number
    },
    createdAt:{
        type: Date,
        expires: '15m', 
        index: true,
        default: Date.now
    }
})

const Token=mongoose.model('token',tokenSchema);

module.exports= Token;