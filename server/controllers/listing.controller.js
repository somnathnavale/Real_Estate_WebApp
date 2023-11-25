import Enum from "../models/enum.model.js";
import Listing from "../models/listing.model.js";
import CustomError from "../utils/error/CustomError.js";
import { asyncErrorHandler } from "../utils/error/errorHelpers.js";
import { generateQuery } from "../utils/helper/listingHelpers.js";

export const addListing = asyncErrorHandler(async (req, res) => {
  if (req.user.id !== req.body.owner)
    throw new CustomError("Not Allowed To Add Property", 401);
  const newListing = new Listing(req.body);
  await newListing.save();
  res.status(200).json({ message: "Property Added Successfully" });
});

export const getAllListings = asyncErrorHandler(async (req, res) => {
  const filteredQuery=generateQuery(Listing.find(),req);
  const response = await filteredQuery;
  res.json({ listings: response });
});

export const getListing = asyncErrorHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id).select("-__v");
  if(!listing){
    throw new CustomError("Property With Given Id not found",404);
  }
  res.json({ listing });
});

export const getCategoryCount=asyncErrorHandler(async(req,res)=>{
  const response=await Enum.aggregate([
    {
      $match: {
        category: "category", 
      },
    },
    {
      $lookup: {
        from: "listings", 
        localField: "value",
        foreignField: "category",
        as: "listings",
      },
    },
    {
      $project:{
        _id:0,
        type:"$value",
        count:{$size:"$listings"}
      }
    }
    // {
    //   $group: {
    //     _id: null,
    //     categoryCounts: {
    //       $push: {
    //         k: "$value",
    //         v: { $size: "$listings" },
    //       },
    //     },
    //   },
    // },
    // {
    //   $replaceRoot: {
    //     newRoot: {
    //       $arrayToObject: "$categoryCounts",
    //     },
    //   },
    // },
  ]);
  res.json({categoryCounts:response})
})