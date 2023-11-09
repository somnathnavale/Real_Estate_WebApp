import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { defaultPropertyData, property } from "../../utils/constants/listings";
import TextInput from '../../components/Inputs/TextInput';
import Dropdown from "../../components/Inputs/Dropdown";
import { getEnums } from "../../redux/enum/enumSlice";
import useAxios from "../../hooks/useAxios";
import { axiosPublic } from "../../api/axios";
import Snackbar from "../../components/Snackbar";
import { addListing, updateListingStatus } from "../../redux/listings/listingSlice";

const AddListing = () => {
  const [propertyData, setPropertyData] = useState(
    structuredClone(defaultPropertyData)
  );
  
  const {enums,error:enumError,status:enumStatus}=useSelector(store=>store.enum);
  const {status:listingStatus,error:listingError}=useSelector(store=>store.listing);

  const {user}=useSelector(store=>store.user);
  const dispatch=useDispatch();
  const axios=useAxios(axiosPublic);

  useEffect(()=>{
    if(enumStatus==='idle'){
      dispatch(getEnums({axios}));
    }
  },[enumStatus,dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addListing({axios,data:{...propertyData,owner:user._id}})).then(()=>{
      setPropertyData(structuredClone(defaultPropertyData));
    })
  };

  const handleSnackbar = () => {
    let message = enumStatus === "failed"? enumError: "";
    let type = enumStatus === "failed"? "error": "none";
    let open = enumStatus === "failed";
    let onClose = () => {};
    if(listingStatus==='failed'){
      message=listingError;
      type="error";
      open=listingStatus==='failed';
      onClose=()=>dispatch(updateListingStatus('idle'));
    }
    if(listingStatus==='succeeded'){
      message="Added Property Successfully";
      type="success";
      open=listingStatus==='succeeded';
      onClose=()=>dispatch(updateListingStatus('idle'));
    }
    return {
      message,
      type,
      open,
      onClose,
      time: 2000,
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
              options={enums?.lift ||[]}
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
            disabled={enumStatus==='loading'}
            className="bg-slate-700 text-white p-2 px-4 rounded-md hover:opacity-95 disabled:opacity-80"
          >
            Submit
          </button>
          <button
            type="button"
            disabled={enumStatus==='loading'}
            className="bg-slate-300 text-slate-700 ml-2 p-2 px-4 rounded-md hover:opacity-95 disabled:opacity-80"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
