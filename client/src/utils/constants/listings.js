export const property = {
  name: {
    label: "Name",
    key: "name",
    initialValue: "",
    info:"",
    required: true,
  },
  locality:{
    label: "Address Line 1",
    key: "locality",
    initialValue: "",
    info:"",
    required:true
  },
  street: {
    label: "Street",
    key: "street",
    initialValue: "",
    info:"",
    required: true,
  },
  city: {
    label: "City",
    key: "city",
    initialValue: "",
    info:"",
    required: true,
  },
  state: {
    label: "State",
    key: "state",
    initialValue: "",
    info:"",
    required: true,
  },
  zipCode: {
    label: "Zip Code",
    key: "zipCode",
    initialValue: "",
    info:"",
    required: true,
  },
  country: {
    label: "Country",
    key: "country",
    initialValue: "",
    info:"",
    required: true,
  },
  description: {
    label: "Description",
    key: "description",
    initialValue: "",
    info:"",
    required: true,
  },
  photos: {
    label: "Photos",
    key: "photos",
    initialValue: [],
    info:"",
    required: false,
  },
  category: {
    label: "Category",
    key: "category",
    initialValue: "",
    info:"",
    required: true,
  },
  listingType: {
    label: "Listing Type",
    key: "listingType",
    initialValue: "",
    info:"",
    required: true,
  },
  status: {
    label: "Status",
    key: "status",
    initialValue: "",
    info:"",
    required: true,
  },
  availability: {
    label: "Availability (days)",
    key: "availability",
    initialValue: "",
    info:"",
    required: true,
  },
  carpetArea: {
    label: "Area (sqft)",
    key: "carpetArea",
    initialValue: "",
    info:"Add Carpet Area for Apartment and Commercial Properties, for Condo and Houses add Total Property Area",
    required: true,
  },
  furnishing: {
    label: "Furnishing",
    key: "furnishing",
    initialValue: "",
    info:"",
    required: true,
  },
  price: {
    label: "Price (in Rs.)",
    key: "price",
    initialValue: "",
    info:"",
    required: true,
  },
  floor: {
    label: "Floor",
    key: "floor",
    initialValue: "",
    info:"",
    required: false,
  },
  facing: {
    label: "Facing",
    key: "facing",
    initialValue: "",
    info:"",
    required: false,
  },
  lift: {
    label: "Lift",
    key: "lift",
    initialValue: "",
    info:"",
    required: false,
  },
  bathroom: {
    label: "Bathrooms",
    key: "bathroom",
    initialValue: "",
    info:"",
    required: false,
  },
  bedroom: {
    label: "Bedrooms",
    key: "bed",
    initialValue: "",
    info:"",
    required: false,
  },
  balcony: {
    label: "Balcony",
    key: "balcony",
    initialValue: "",
    info:"",
    required: false,
  },
  parking: {
    label: "Parking (count)",
    key: "parking",
    initialValue: "",
    info:"",
    required: false,
  },
  waterAvailability: {
    label: "Water Availability",
    key: "waterAvailability",
    initialValue: "",
    info:"",
    required: false,
  },
  electricityAvailability: {
    label: "Electricity Availability",
    key: "electricityAvailability",
    initialValue: "",
    info:"",
    required: false,
  },
  propertyAge:{
    label: "Property Age (in Yrs)",
    key: "propertyAge",
    initialValue: "",
    info:"Provide total years count from property was developed",
    required: false,
  }
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

