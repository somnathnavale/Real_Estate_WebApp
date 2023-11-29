import Enum from "../models/enum.model.js";
import Listing from "../models/listing.model.js";
import CustomError from "../utils/error/CustomError.js";
import { asyncErrorHandler } from "../utils/error/errorHelpers.js";
import { generateQuery } from "../utils/helper/listingHelpers.js";

export const addListing = asyncErrorHandler(async (req, res) => {
  if (req.user.id !== req.body.owner)
    throw new CustomError("Not Allowed To Add Property", 401);
  const newListing = new Listing(req.body);
  const response=await newListing.save();
  const { _id,name, price, category, listingType, address, photos } = response;
  const listing = {_id, name, price, category, listingType, address, photos };
  res.status(200).json({ message: "Property Added Successfully",listing });
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

export const deleteListing = asyncErrorHandler(async (req, res) => {
  const listing = await Listing.findOneAndDelete({_id:req.params.id,owner:req.user.id}).select("-__v");
  if(!listing){
    throw new CustomError("Property With Given Id not found",404);
  }
  res.json({ listing });
});

export const updateListing=asyncErrorHandler(async(req,res)=>{
  if(req.body._id!==req.params.id)
    throw new CustomError("Mismatch in the Property Id",400);

  if (req.user.id !== req.body.owner)
    throw new CustomError("Not Allowed To Update Property", 401);

  const listing=await Listing.findOneAndUpdate({_id:req.params.id,owner:req.user.id},req.body, {
    new: true,
    runValidators: true,
    select: { __v: 0},
  })
  if(!listing){
    throw new CustomError("Property With Given Id not found",404);
  }
  res.json({ listing });
})