import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import Enum from "../../models/enum.model.js";
import Listing from "../../models/listing.model.js";
import { enums } from "../data/enums.data.js";
import { listings } from "../data/listings.data.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    try {
      await Listing.deleteMany({});
      await Listing.insertMany(listings)
      // await Enum.deleteMany({});
      // const response = await Enum.insertMany(enums);
      console.log("successfully inserted");
    } catch (error) {
      
    }
  })
  .catch((err) => {
    console.log(err);
  });
