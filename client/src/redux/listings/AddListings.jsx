import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { defaultPropertyData, property } from "../../utils/constants/listings";
import TextInput from "../../components/Inputs/TextInput";
import Dropdown from "../../components/Inputs/Dropdown";
import useAxios from "../../hooks/useAxios";
import { axiosPublic } from "../../api/axios";
import Snackbar from "../../components/Snackbar";
import { addListing } from "./listingService";
import { STATUS } from "../../utils/constants/common";
import UploadImage from "../../components/Inputs/UploadImage";

const AddListing = () => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [propertyData, setPropertyData] = useState(
    structuredClone(defaultPropertyData)
  );

  const { enums, error: enumError } = useSelector((store) => store.enum);
  const { error } = useSelector((store) => store.listing);

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const axios = useAxios(axiosPublic);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(STATUS.LOADING);
    dispatch(addListing({ axios, data: { ...propertyData, owner: user._id } }))
      .unwrap()
      .then((res) => {
        setStatus(STATUS.SUCCEEDED);
        setPropertyData(structuredClone(defaultPropertyData));
      })
      .catch((e) => {
        setStatus(STATUS.FAILED);
      });
  };

  const handleSnackbar = () => {
    let message =
      status === STATUS.FAILED || enumError
        ? error || enumError
        : status === STATUS.SUCCEEDED
        ? "Property Addeed Successfully"
        : "";
    let type =
      status === STATUS.FAILED || enumError
        ? "error"
        : status === STATUS.SUCCEEDED
        ? "success"
        : "none";
    let open =
      status === STATUS.FAILED || status === STATUS.SUCCEEDED || enumError;
    let onClose = () => {
      setStatus(STATUS.IDLE);
    };
    return {
      message,
      type,
      open,
      onClose,
      time: type === "error" ? 6000 : 1500,
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
          <div className="col-span-full my-2 sm:my-0">
            <UploadImage
              propertyData={propertyData}
              setPropertyData={setPropertyData}
            />
          </div>
        </div>
        <div className="mt-3 flex gap-4 justify-center items-center">
          <button
            type="button"
            disabled={status === STATUS.LOADING}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-base sm:w-auto disabled:opacity-80"
            onClick={() =>
              setPropertyData(structuredClone(defaultPropertyData))
            }
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={status === STATUS.LOADING}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-base sm:w-auto disabled:opacity-80"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
