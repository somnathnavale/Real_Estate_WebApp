import Listing from "../models/listing.model.js";

export const addListing=async(req,res,next)=>{
    if(req.user.id!==req.body.owner){
        return next(new ErrorHandler(401, "Not Allowed To Add Property"));
    }
    try {
        const newListing=new Listing(req.body);
        await newListing.save();
        res.status(200).json({message:"Property Added Successfully"});
    } catch (error) {
        next(error)
    }
}

export const getAllListings=async(req,res,next)=>{
    try {
        const response=await Listing.find({}).limit(30);
        res.send(response);
    } catch (error) {
        next(error)
    }
}