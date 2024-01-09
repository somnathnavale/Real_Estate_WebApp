const mongoose = require("mongoose");

const message = "value `{VALUE}` is not allowed for `{PATH}` field";

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "property name is required"],
    trim: true,
    minlength: [6, "property name is shorter than expected"],
    maxlength: [200, "property name is longer than expected"],
  },
  address: {
    locality:{
      type:String,
      required:true
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
      minlength: [6, "Zip Code is shorter than expected"],
      maxlength:[6,"Zip Code is longer than expected"]
    },
    country: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
    required: [true, "property description is required"],
    trim: true,
    minlength: [6, "property description is shorter than expected"],
    maxlength: [2000, "property description is longer than expected"],
  },
  photos: [String],
  category: {
    type: String,
    enum: {
      values: ["Apartment", "Condo", "Commercial", "House"],
      message,
    },
    required: [true, "property category is required"],
  },
  listingType: {
    type: String,
    enum: {
      values: ["Rent", "Sale"],
      message,
    },
    required: [true, "property listing type is required"],
  },
  status: {
    type: String,
    enum: {
      values: ["Available", "Unavailable"],
      message,
    },
    default: "Available",
    required: [true, "property status is required"],
  },
  availability: {
    type: Number,
    required: [true, "available field is required"],
    min: 0,
  },
  carpetArea: {
    type: Number,
    required: [true, "carpet area is required"],
    min: [10, "provide correct property area"],
  },
  propertyAge: {
    type: Number,
    required: [true, "Property Age is required"],
  },
  furnishing: {
    type: String,
    enum: {
      values: ["Un-furnished", "Semi-furnished", "Fully-furnished"],
      message,
    },
    default: "Un-furnished",
    required: [true, "property furnishing is required"],
  },
  price: {
    type: Number,
    required: true,
    min: [100, "provide correct property price"],
  },
  floor: { type: Number, min: [0, "provide correct floor location"] },
  facing: {
    type: String,
    enum: {
      values: [
        "East",
        "West",
        "South",
        "North",
        "North-East",
        "North-West",
        "South-East",
        "South-West",
      ],
      message,
    },
  },
  lift: {
    type: String,
    enum: {
      values: ["Yes", "No"],
      message,
    },
  },
  bathroom: { type: Number, min: [0, "provide correct bathrooms count"] },
  bed: { type: Number, min: [0, "provide correct bedrooms count"] },
  balcony: { type: Number, min: [0, "provide correct balcony count"] },
  parking: { type: Number, min: [0, "provide correct parking count"] },
  waterAvailability: {
    type: String,
    enum: {
      values: ["Always", "Mostly", "Periodically", "Limited", "Scarce"],
      message,
    },
  },
  electricityAvailability: {
    type: String,
    enum: {
      values: ["Always", "Mostly", "Periodically", "Limited", "Scarce"],
      message,
    },
  },
  owner: { type: String, ref: "User" },
  location: {
    type: {
      type: String, 
      enum: ['Point'],
      required: true
    },
    coordinates:[Number]
  }
},{
  timestamps:true
});

listingSchema.index({ location: '2dsphere' });

listingSchema.post(["find", "findOne", "findById","findOneAndUpdate"], async function (docs) {
  if (Array.isArray(docs)) {
    await Promise.all(docs.map(async (doc) => doc.populate({ path: "owner", select: "username fullname email mobileNo" })));
  } else {
    if(docs)
      await docs.populate({ path: "owner", select: "username fullname email mobileNo" });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

// const listingSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "property name is required"],
//     trim: true,
//     minlength: [6, "property name is shorter than expected"],
//     maxlength: [200, "property name is longer than expected"],
//   },
//   address: {
//     type: String,
//     required: [true, "property address is required"],
//     trim: true,
//     minlength: [10, "property address is shorter than expected"],
//     maxlength: [400, "property address is longer than expected"],
//   },
//   description: {
//     type: String,
//     required: [true, "property description is required"],
//     trim: true,
//     minlength: [6, "property description is shorter than expected"],
//     maxlength: [2000, "property description is longer than expected"],
//   },
//   photos: [String],
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Enum",
//     required: [true, "property category is required"],
//   },
//   listingType: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Enum",
//     required: [true, "property listing type is required"],
//   },
//   status: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Enum",
//     required: [true, "property status is required"],
//   },
//   availability: {
//     type: Number,
//     required: [true, "available field is required"],
//     min: 0,
//   },
//   carpetArea: {
//     type: Number,
//     required: [true, "carpet area is required"],
//     min: [10, "provide correct property area"],
//   },
//   furnishing: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Enum",
//     required: [true, "property furnishing is required"],
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: [100, "provide correct property price"],
//   },
//   floor: { type: Number, min: [0, "provide correct floor location"] },
//   facing: { type: mongoose.Schema.Types.ObjectId, ref: "Enum" },
//   lift: { type: mongoose.Schema.Types.ObjectId, ref: "Enum" },
//   bathrooms: { type: Number, min: [0, "provide correct bathrooms count"] },
//   bed: { type: Number, min: [0, "provide correct bedrooms count"] },
//   balcony: { type: Number, min: [0, "provide correct balcony count"] },
//   parking: { type: Number, min: [0, "provide correct parking count"] },
//   waterAvailability: { type: mongoose.Schema.Types.ObjectId, ref: "Enum" },
//   electricityAvailability: { type: mongoose.Schema.Types.ObjectId, ref: "Enum" },
//   owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// });

// listingSchema.post(['find', 'findOne', 'findById'], async function (docs) {
//   if (Array.isArray(docs)) {
//     await Promise.all(docs.map(async (doc) => await populateEnumsAndUser(doc)));
//   } else {
//     await populateEnumsAndUser(docs);
//   }
// });

// async function populateEnumsAndUser(doc){
//   const populateFields=[];
//   for(let field in doc._doc){
//     if(field!=="_id" &&  doc[field] instanceof mongoose.Types.ObjectId){
//       populateFields.push(field);
//     }
//   }
//   await doc.populate({path:populateFields.join(' '),select:'_id value username email'})
// }
