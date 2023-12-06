const mongoose = require("mongoose");

const enumSchema = new mongoose.Schema({
    category: { type: String, required: true },
    key: { type: String, required: true },
    value: { type: String, required: true },
  });
  
  const Enum = mongoose.model("Enum", enumSchema);

module.exports=Enum;
  