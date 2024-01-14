const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Enum = require("../../models/enum.model.js");
const Listing = require("../../models/listing.model.js");
const { enums } = require("../data/enums.data.js");
const { listings } = require("../data/listings.data.js");

dotenv.config({ path: "../../.env" });

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    try {
      // await Listing.deleteMany({});
      // await Listing.insertMany(listings)
      await Enum.deleteMany({});
      const response = await Enum.insertMany(enums);
      console.log("successfully inserted");
    } catch (error) {
      
    }
  })
  .catch((err) => {
    console.log(err);
  });
