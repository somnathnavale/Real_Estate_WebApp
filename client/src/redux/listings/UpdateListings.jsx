import React, { useEffect, useRef, useState } from "react";
import { defaultPropertyData } from "../../utils/constants/listings";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../components/Inputs/TextInput";
import Dropdown from "../../components/Inputs/Dropdown";
import useAxios from "../../hooks/useAxios";
import { axiosPublic } from "../../api/axios";
import { updateListing } from "./listingSlice";
import { getListing } from "./listingService";
import { STATUS } from "../../utils/constants/common";

const UpdateListings = () => {
  const { id } = useParams();
  const [status,setStatus]=useState('idle');
  const [propertyData, setPropertyData] = useState({
    ...structuredClone(defaultPropertyData),
  });
  
  const {
    enums,
    error: enumError,
    status: enumStatus,
  } = useSelector((store) => store.enum);

  const { status: listingStatus, error: listingError } = useSelector(
    (store) => store.listing
  );
  
  const dispatch = useDispatch();
  const axios = useAxios(axiosPublic);
  const callRef = useRef(false);

  useEffect(()=>{
    if (!callRef.current) {
        callRef.current = true;
        dispatch(getListing({ id }));
      }
      return () => {
        dispatch(updateListing({}));
      };
  },[dispatch])

  const handleSnackbar = () => {
    let message = enumStatus === STATUS.FAILED ? enumError : "";
    let type = enumStatus === STATUS.FAILED ? "error" : "none";
    let open = enumStatus === STATUS.FAILED;
    let onClose = () => {};
    if (listingStatus === STATUS.FAILED) {
      message = listingError;
      type = "error";
      open = listingStatus === STATUS.FAILED;
    }
    if (listingStatus === STATUS.SUCCEEDED) {
      message = "Property Updated Successfully";
      type = "success";
      open = listingStatus === STATUS.SUCCEEDED;
    }
    return {
      message,
      type,
      open,
      onClose,
      time: 1500,
    };
  };

  return (
    <div className="w-[100%] max-w-6xl mx-auto my-6 p-6 bg-[#F7F9FC] shadow-md rounded-lg">
      <Snackbar {...handleSnackbar()} />
      <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">
        Property Information
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="sm:col-span-2">
            <TextInput
              input="text"
              data={propertyData}
              field={property.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Dropdown
              data={propertyData}
              field={property.category}
              onChange={handleChange}
              options={enums?.category || []}
            />
          </div>
          <div>
            <Dropdown
              data={propertyData}
              field={property.listingType}
              onChange={handleChange}
              options={enums?.listingType || []}
            />
          </div>
          <div>
            <Dropdown
              data={propertyData}
              field={property.status}
              onChange={handleChange}
              options={enums?.status || []}
            />
          </div>
          <div>
            <TextInput
              input="number"
              data={propertyData}
              field={property.availability}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextInput
              input="number"
              data={propertyData}
              field={property.carpetArea}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextInput
              input="number"
              data={propertyData}
              field={property.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextInput
              input="number"
              data={propertyData}
              field={property.floor}
              onChange={handleChange}
            />
          </div>
          <div>
            <Dropdown
              data={propertyData}
              field={property.furnishing}
              onChange={handleChange}
              options={enums?.furnishing || []}
            />
          </div>
          <div>
            <Dropdown
              data={propertyData}
              field={property.lift}
              onChange={handleChange}
              options={enums?.lift || []}
            />
          </div>
          <div>
            <Dropdown
              data={propertyData}
              field={property.facing}
              onChange={handleChange}
              options={enums?.facing || []}
            />
          </div>
          <div>
            <TextInput
              input="number"
              data={propertyData}
              field={property.bathroom}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextInput
              input="number"
              data={propertyData}
              field={property.bedroom}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextInput
              input="number"
              data={propertyData}
              field={property.balcony}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextInput
              input="number"
              data={propertyData}
              field={property.parking}
              onChange={handleChange}
            />
          </div>
          <div>
            <Dropdown
              data={propertyData}
              field={property.waterAvailability}
              onChange={handleChange}
              options={enums?.waterAvailability || []}
            />
          </div>
          <div>
            <Dropdown
              data={propertyData}
              field={property.electricityAvailability}
              onChange={handleChange}
              options={enums?.electricityAvailability || []}
            />
          </div>
          <div className="sm:col-span-3 lg:col-span-2">
            <TextInput
              input="textarea"
              data={propertyData}
              field={property.address}
              onChange={handleChange}
            />
          </div>
          <div className="sm:col-span-3 lg:col-span-4">
            <TextInput
              input="textarea"
              data={propertyData}
              field={property.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center items-center">
          <button
            type="submit"
            disabled={enumStatus === STATUS.LOADING}
            className="bg-slate-700 text-white p-2 px-4 rounded-md hover:opacity-95 disabled:opacity-80"
          >
            Submit
          </button>
          <button
            type="button"
            disabled={enumStatus === STATUS.LOADING}
            className="bg-slate-300 text-slate-700 ml-2 p-2 px-4 rounded-md hover:opacity-95 disabled:opacity-80"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateListings;
