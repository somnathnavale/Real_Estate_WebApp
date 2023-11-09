import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true, maxlength: 400 },
  description: { type: String, maxlength: 2000, required: true },
  photos: [String],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enum",
    required: true,
  },
  listingType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enum",
    required: true,
  },
  status: { type: mongoose.Schema.Types.ObjectId, ref: "Enum", required: true },
  availability: { type: Number, required: true },
  carpetArea: { type: Number, required: true },
  furnishing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enum",
    required: true,
  },
  price: { type: Number, required: true },
  floor: { type: Number },
  facing: { type: mongoose.Schema.Types.ObjectId, ref: "Enum" },
  lift: { type: mongoose.Schema.Types.ObjectId, ref: "Enum" },
  bathrooms: Number,
  bed: Number,
  balcony: Number,
  parking: Number,
  waterAvailability: { type: mongoose.Schema.Types.ObjectId, ref: "Enum" },
  electricityStatus: { type: mongoose.Schema.Types.ObjectId, ref: "Enum" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;