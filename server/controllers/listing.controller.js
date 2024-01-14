const Enum = require("../models/enum.model.js");
const Listing = require("../models/listing.model.js");
const User = require("../models/user.model.js");

const {
  generateDescriptionService,
} = require("../services/chatGeneration.service.js");
const { propertyRegistrationEmail } = require("../services/email.service.js");
const CustomError = require("../utils/error/CustomError.js");
const { asyncErrorHandler } = require("../utils/error/errorHelpers.js");
const { generateQuery } = require("../utils/helper/listingHelpers.js");

const addListing = asyncErrorHandler(async (req, res) => {
  if (req.user.id !== req.body.owner)
    throw new CustomError("Not Allowed To Add Property", 401);

  //this removes empty enums fields
  const enumsFields = [
    "category",
    "listingType",
    "status",
    "furnishing",
    "facing",
    "lift",
    "waterAvailability",
    "electricityAvailability",
    "locality",
    "street",
    "city",
    "state",
    "country",
    "zipCode",
  ];
  enumsFields.forEach((field) => {
    if (req.body[field] == "") {
      delete req.body[field];
    }
  });

  const user = await User.findById(req.user.id);
  if (!user) throw new CustomError("Not Allowed To Add Property", 401);
  const { coordinates, ...data } = req.body;
  const newListing = new Listing({
    ...data,
    location: {
      type: "Point",
      coordinates,
    },
  });
  const response = await newListing.save();

  const { _id, name, price, category, listingType, address, photos } = response;
  const listing = { _id, name, price, category, listingType, address, photos };
  const wholeAddress = `${address?.locality}, ${address?.street}, ${address?.city}, ${address?.zipCode}, ${address?.state}, ${address?.country}`;

  await propertyRegistrationEmail(
    user?.email,
    user?.fullname || user?.username,
    name,
    category,
    wholeAddress,
    price + listingType === "Sale" ? "Per Month" : ""
  );

  res.status(200).json({ message: "Property Added Successfully", listing });
});

const getAllListings = asyncErrorHandler(async (req, res) => {
  const { query: filteredQuery, countQuery } = generateQuery(
    Listing.find(),
    req
  );
  const count = await countQuery;
  const response = await filteredQuery;
  res.json({ listings: response, count });
});

const getListing = asyncErrorHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id).select("-__v");
  if (!listing) {
    throw new CustomError("Property With Given Id not found", 404);
  }
  res.json({ listing });
});

const getCategoryCount = asyncErrorHandler(async (req, res) => {
  const response = await Enum.aggregate([
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
      $project: {
        _id: 0,
        type: "$value",
        count: { $size: "$listings" },
      },
    },
  ]);
  res.json({ categoryCounts: response });
});

const deleteListing = asyncErrorHandler(async (req, res) => {
  const listing = await Listing.findOneAndDelete({
    _id: req.params.id,
    owner: req.user.id,
  }).select("-__v");
  if (!listing) {
    throw new CustomError("Property With Given Id not found", 404);
  }
  res.json({ listing });
});

const updateListing = asyncErrorHandler(async (req, res) => {
  if (req.body._id !== req.params.id)
    throw new CustomError("Mismatch in the Property Id", 400);

  if (req.user.id !== req.body.owner)
    throw new CustomError("Not Allowed To Update Property", 401);

  //this removes empty enum fields
  const enumsFields = [
    "category",
    "listingType",
    "status",
    "furnishing",
    "facing",
    "lift",
    "waterAvailability",
    "electricityAvailability",
  ];
  enumsFields.forEach((field) => {
    if (req.body[field] == "") {
      delete req.body[field];
    }
  });

  const listing = await Listing.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true,
      select: { __v: 0 },
    }
  );

  if (!listing) {
    throw new CustomError("Property With Given Id not found", 404);
  }
  res.json({ listing });
});

const getGeocode = async (req, res, next) => {
  try {
    const query = req.query;

    const encodedObj = Object.keys(query)
      .map((key) => `${key}=${encodeURIComponent(query[key])}`)
      .join("&");

    const jsonResponse = await fetch(
      `https://eu1.locationiq.com/v1/search?key=${process.env.GEOCODE_KEY}&structured?${encodedObj}&format=json`
    );
    const response = await jsonResponse.json();

    if (Array.isArray(response) && response.length > 0) {
      const location = response[0];
      res.json({ lat: location.lat, lon: location.lon });
    } else {
      next(new CustomError("No Such Address Exists", 400));
    }
  } catch (error) {
    if (error?.response) {
      return next(new CustomError(error?.response?.data?.error, 400));
    }
    next(new CustomError(error?.message, 404));
  }
};

const generateDescription = asyncErrorHandler(async (req, res, next) => {
  const prompt = req.body.prompt;
  const description = await generateDescriptionService(prompt);
  res.json({ description });
});

module.exports = {
  addListing,
  getAllListings,
  getListing,
  getCategoryCount,
  deleteListing,
  updateListing,
  getGeocode,
  generateDescription,
};
