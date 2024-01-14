import { ErrorHandler } from "./asyncHandlers";

export const getGeocode = async (axios, propertyData) => {
  
  const obj = {
    street: propertyData.street,
    city: propertyData.city,
    state: propertyData.state,
    country: propertyData.country,
    postalcode: propertyData.zipCode,
  };

  const encodedObj = Object.keys(obj)
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");

  try {
    const response = await axios.get(`/api/listings/geocode/address?${encodedObj}`);
    const {lat,lon}=response.data;
    return {success:true,coordinates:[lon,lat]};
  } catch (error) {
    const err=ErrorHandler(error);
    return { success: false, message:err.message};
  }
};
