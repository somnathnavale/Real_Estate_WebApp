const Enum = require("../models/enum.model.js");
const Listing = require("../models/listing.model.js");
const CustomError = require("../utils/error/CustomError.js");
const { asyncErrorHandler } = require("../utils/error/errorHelpers.js");
const { generateQuery } = require("../utils/helper/listingHelpers.js");

const addListing = asyncErrorHandler(async (req, res) => {
  if (req.user.id !== req.body.owner)
    throw new CustomError("Not Allowed To Add Property", 401);
  
    //this removes empty enums fields
  const enumsFields=["category","listingType","status","furnishing","facing","lift","waterAvailability","electricityAvailability"];
  enumsFields.forEach((field)=>{
    if(req.body[field]==""){
      delete req.body[field];
    }
  })
   
  const newListing = new Listing(req.body);
  const response=await newListing.save();
  const { _id,name, price, category, listingType, address, photos } = response;
  const listing = {_id, name, price, category, listingType, address, photos };
  res.status(200).json({ message: "Property Added Successfully",listing });
});

const getAllListings = asyncErrorHandler(async (req, res) => {
  const {query:filteredQuery,countQuery}=generateQuery(Listing.find(),req);
  const count=await countQuery;
  const response = await filteredQuery;
  res.json({ listings: response,count });
});

const getListing = asyncErrorHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id).select("-__v");
  if(!listing){
    throw new CustomError("Property With Given Id not found",404);
  }
  res.json({ listing });
});

const getCategoryCount=asyncErrorHandler(async(req,res)=>{
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

const deleteListing = asyncErrorHandler(async (req, res) => {
  const listing = await Listing.findOneAndDelete({_id:req.params.id,owner:req.user.id}).select("-__v");
  if(!listing){
    throw new CustomError("Property With Given Id not found",404);
  }
  res.json({ listing });
});

const updateListing=asyncErrorHandler(async(req,res)=>{
  if(req.body._id!==req.params.id)
    throw new CustomError("Mismatch in the Property Id",400);

  if (req.user.id !== req.body.owner)
    throw new CustomError("Not Allowed To Update Property", 401);
  
  //this removes empty enum fields 
  const enumsFields=["category","listingType","status","furnishing","facing","lift","waterAvailability","electricityAvailability"];
  enumsFields.forEach((field)=>{
    if(req.body[field]==""){
      delete req.body[field];
    }
  })
  
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

module.exports = {
  addListing,
  getAllListings,
  getListing,
  getCategoryCount,
  deleteListing,
  updateListing,
};