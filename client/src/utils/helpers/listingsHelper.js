import { property } from "../constants/listings";

export const createFilterQuery = (filter) => {
  let query = {};
  if (filter.searchText) {
    query.searchText = filter.searchText;
  }
  if (filter.category.length) {
    query.category = filter.category.join(",");
  }
  if (filter.listingType.length) {
    query.listingType = filter.listingType.join(",");
  }
  if (filter.furnishing.length) {
    query.furnishing = filter.furnishing.join(",");
  }
  if (filter.amenities.length) {
    const res = filter.amenities.reduce((acc, curr) => {
      acc[curr] = true;
      return acc;
    }, {});
    query = { ...query, ...res };
  }
  query = { ...query, page: filter.page };
  const priceBand = filter.price.filter((item) => item.checked);
  if (priceBand.length) {
    query.minPrice = priceBand[0].min;
    query.maxPrice = priceBand[priceBand.length - 1].max;
  }
  return query;
};

export const PageValidations = (propertyData, page) => {
  const requiredFields = Object.values(property).reduce((acc, curr) => {
    if (curr.required === true && curr.page === page) acc.push(curr.key);
    return acc;
  }, []);

  for (let field of requiredFields) {
    const val = propertyData[field];
    if (val === "" || val === null) {
      return {
        status: true,
        message: `${property[field].label} is required field`,
      };
    }
  }
};

export const createPrompt = (propertyData) => {
  const address = `${propertyData?.locality}, ${propertyData?.street}, ${propertyData?.city}, ${propertyData?.zipCode}, ${propertyData?.state}, ${propertyData?.country}`;

  const prompt = `generate 2 informative paragraphs property having following information and features, 
  Name: ${propertyData?.name}
  Address: ${address}
  Category: ${propertyData?.category}
  Listing Type: ${propertyData?.listingType}
  Status: ${propertyData?.status}
  Availability(in days): ${propertyData?.availability}
  Area(in Sqft): ${propertyData?.carpetArea}
  Furnishing: ${propertyData?.furnishing}
  property Age: ${propertyData?.propertyAge}
  Price: ${propertyData?.price}
  Floor: ${propertyData?.floor} 
  Facing: ${propertyData?.facing}
  Lift: ${propertyData?.lift}
  Bathrooms: ${propertyData?.bathroom}
  Bedrooms: ${propertyData?.bed}
  Balcony: ${propertyData?.balcony}
  Parking: ${propertyData?.parking}
  Water Availability: ${propertyData?.waterAvailability}
  Electricity Availability: ${propertyData?.electricityAvailability}.
  Ignore bedrooms, bathrooms and balconies for commercial category properties,
  consider area as carpet area incase of apartment and commercial properties,
  Ignore Lift and floor for House and Condo Category. ignore values which are undefined
  `;
  return prompt;
};
