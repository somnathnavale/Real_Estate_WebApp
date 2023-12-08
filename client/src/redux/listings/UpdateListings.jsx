import React, { useEffect, useRef, useState } from "react";
import { defaultPropertyData, property } from "../../utils/constants/listings";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../components/Inputs/TextInput";
import Dropdown from "../../components/Inputs/Dropdown";
import useAxios from "../../hooks/useAxios";
import { axiosPublic } from "../../api/axios";
import { getListing, updateListing } from "./listingService";
import { STATUS } from "../../utils/constants/common";
import Snackbar from "../../components/Snackbar";
import UploadImage from "../../components/Inputs/UploadImage";
import useFile from "../../hooks/useFile";

const UpdateListings = () => {
  const { id } = useParams();
  const [status, setStatus] = useState(STATUS.IDLE);
  const { error } = useSelector((store) => store.listing);
  const [propertyData, setPropertyData] = useState({
    ...structuredClone(defaultPropertyData),
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const {
    enums,
    error: enumError,
    status: enumStatus,
  } = useSelector((store) => store.enum);
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const axios = useAxios(axiosPublic);
  const callRef = useRef(false);
  const { handleFileUpload } = useFile();

  useEffect(() => {
    if (!callRef.current) {
      fetch();
    }
  }, [dispatch]);

  function fetch() {
    setStatus(STATUS.LOADING);
    callRef.current = true;
    dispatch(getListing({ id }))
      .unwrap()
      .then((response) => {
        setPropertyData((prev) => ({
          ...prev,
          ...structuredClone(response?.listing),
        }));
        setStatus(STATUS.IDLE);
      })
      .catch(() => {
        setStatus(STATUS.FAILED);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus(STATUS.LOADING);
      let addedPhotos = [];
      if (selectedFiles.length) {
        const response = await handleFileUpload(selectedFiles);
        if (!response.success) {
          setStatus(STATUS.IDLE);
          return;
        }
        setSelectedFiles([]);
        addedPhotos = response.filesUrls;
      }
      setPropertyData((prev) => ({
        ...prev,
        photos: [...addedPhotos, ...prev?.photos],
      }));
      await dispatch(
        updateListing({
          axios,
          data: {
            ...propertyData,
            photos: [...addedPhotos, ...propertyData?.photos],
            owner: user._id,
          },
        })
      ).unwrap();
      setStatus(STATUS.SUCCEEDED);
      setSelectedFiles([]);
    } catch (error) {
      console.log(error);
      setStatus(STATUS.FAILED);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleSnackbar = () => {
    let message =
      status === STATUS.FAILED || enumError
        ? error || enumError
        : status === STATUS.SUCCEEDED
        ? "Property Updated Successfully"
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
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              status={status}
              setStatus={setStatus}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            type="button"
            disabled={status === STATUS.LOADING}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:w-auto disabled:opacity-80"
            onClick={() => fetch()}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={status === STATUS.LOADING}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto disabled:opacity-80"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateListings;
