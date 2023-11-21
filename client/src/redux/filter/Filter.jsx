import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCheckbox,
  togglePriceCheckbox,
  clearFilters,
} from "./filterSlice";
import { amenities, furnishing, listingCategory, listingType } from "../../utils/constants/filter";
import { axiosPublic } from "../../api/axios";
import { getListings } from "../listings/listingSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const searchFilter = useSelector((state) => state.filter);

  const handleCheckboxChange = (field,value) => {
    dispatch(toggleCheckbox({field,value}));
  };

  const handlePriceChange=(id)=>{
    dispatch(togglePriceCheckbox(id));
  }

  const handleSearch=()=>{
    dispatch(getListings({axios:axiosPublic}));
  }

  return (
    <div className=" bg-white border rounded-md p-4 min-w-[240px] max-h-[75vh] overflow-y-auto">
      <h3 className="text-lg font-medium">All Filters</h3>
      <div className="my-2 border-b-2 border-slate-300"/>
      <div>
        <h3 className="font-medium">Category</h3>
        <div>
          {listingCategory.map((category) => (
            <label key={category} className="flex items-center mt-1">
              <input
                type="checkbox"
                name="category"
                checked={searchFilter.category.includes(category)}
                onChange={(e) => handleCheckboxChange("category",category)}
                className="mr-2 h-4 w-4"
              />
              {category}
            </label>
          ))}
        </div>
      </div>
      <div className="border-b-2 border-slate-300 my-2"/>
      <div>
        <h3 className="font-medium">Listing Type</h3>
        <div>
          {listingType.map((listingType) => (
            <label key={listingType} className="flex items-center mt-1">
              <input
                type="checkbox"
                name="listingType"
                checked={searchFilter.listingType.includes(listingType)}
                onChange={(e) => handleCheckboxChange("listingType",listingType)}
                className="mr-2 h-4 w-4"
              />
              {listingType}
            </label>
          ))}
        </div>
      </div>
      <div className="border-b-2 border-slate-300 my-2"/>
      <div>
        <h3 className="font-medium">Furnishing</h3>
        <div>
          {furnishing.map((item) => (
            <label key={item} className="flex items-center mt-1">
              <input
                type="checkbox"
                name="Furnishing"
                checked={searchFilter.furnishing.includes(item)}
                onChange={(e) => handleCheckboxChange("furnishing",item)}
                className="mr-2 h-4 w-4"
              />
              {item}
            </label>
          ))}
        </div>
      </div>
      <div className="border-b-2 border-slate-300 my-2"/>
      <div>
      <h3 className="font-medium">Property Price</h3>
        <div>
          {searchFilter.price?.map((range,id) => (
            <label key={range.label} className="flex items-center mt-1" htmlFor={range.label}>
              <input
                id={range.label}
                type="checkbox"
                name="price"
                checked={range.checked}
                onChange={() => handlePriceChange(id)}
                className="mr-2 h-4 w-4"
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>
      <div className="border-b-2 border-slate-300 my-2"/>
      <div>
      <h3 className="font-medium">Amenities</h3>
        <div>
        {amenities.map((amenity) => (
            <label key={amenity} className="flex items-center mt-1">
              <input
                type="checkbox"
                name="amenity"
                checked={searchFilter.amenities.includes(amenity)}
                onChange={(e) => handleCheckboxChange("amenities",amenity)}
                className="mr-2 h-4 w-4"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>
      <div className="border-b-2 border-slate-300 my-2"/>
      <div className="mt-2">
        <button className="bg-slate-700 text-white px-2 py-1 rounded-lg mr-2 hover:opacity-90" onClick={handleSearch}>Apply</button>
        <button className="bg-slate-300 text-slate-700 px-2 py-1 rounded-lg hover:opacity-90" onClick={()=>dispatch(clearFilters())}>Clear</button>
      </div>
    </div>
  );
};

export default Filter;
