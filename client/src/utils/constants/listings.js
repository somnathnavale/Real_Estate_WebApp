export const property = {
  name: {
    label: "Name",
    key: "name",
    initialValue: "",
    required: true,
  },
  address: {
    label: "Address",
    key: "address",
    initialValue: "",
    required: true,
  },
  description: {
    label: "Description",
    key: "description",
    initialValue: "",
    required: true,
  },
  photos: {
    label: "Photos",
    key: "photos",
    initialValue: [],
    required: false,
  },
  category: {
    label: "Category",
    key: "category",
    initialValue: "",
    required: true,
  },
  listingType: {
    label: "Listing Type",
    key: "listingType",
    initialValue: "",
    required: true,
  },
  status: {
    label: "Status",
    key: "status",
    initialValue: "",
    required: true,
  },
  availability: {
    label: "Availability (days)",
    key: "availability",
    initialValue: "",
    required: true,
  },
  carpetArea: {
    label: "Carpet Area (sqft)",
    key: "carpetArea",
    initialValue: "",
    required: true,
  },
  furnishing: {
    label: "Furnishing",
    key: "furnishing",
    initialValue: "",
    required: true,
  },
  price: {
    label: "Price (in Rs.)",
    key: "price",
    initialValue: "",
    required: true,
  },
  floor: {
    label: "Floor",
    key: "floor",
    initialValue: "",
    required: false,
  },
  facing: {
    label: "Facing",
    key: "facing",
    initialValue: "",
    required: false,
  },
  lift: {
    label: "Lift",
    key: "lift",
    initialValue: "",
    required: false,
  },
  bathroom: {
    label: "Bathrooms",
    key: "bathroom",
    initialValue: "",
    required: false,
  },
  bedroom: {
    label: "Bedrooms",
    key: "bed",
    initialValue: "",
    required: false,
  },
  balcony: {
    label: "Balcony",
    key: "balcony",
    initialValue: "",
    required: false,
  },
  parking: {
    label: "Parking (count)",
    key: "parking",
    initialValue: "",
    required: false,
  },
  waterAvailability: {
    label: "Water Availability",
    key: "waterAvailability",
    initialValue: "",
    required: false,
  },
  electricityAvailability: {
    label: "Electricity Availability",
    key: "electricityAvailability",
    initialValue: "",
    required: false,
  },
};

export const defaultPropertyData = Object.values(property).reduce(
  (acc, curr) => {
    const key = curr.key;
    const init = curr.initialValue;
    acc[key] = init;
    return acc;
  },
  {}
);

