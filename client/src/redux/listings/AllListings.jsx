import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListings } from "./listingService";
import { useLocation } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard";
import { STATUS } from "../../utils/constants/common";

const AllListings = () => {
  const [status,setStatus]=useState(STATUS.IDLE);
  const dispatch = useDispatch();
  const callRef = useRef(false);
  const { listings,error } = useSelector((store) => store.listing);
  const location = useLocation();

  useEffect(() => {
    const fetch = () => {
      dispatch(getListings()).unwrap().catch(()=>{
        setStatus(STATUS.FAILED);
      });
    };
    if (!callRef.current) {
      callRef.current = true;
      fetch();
    }

  }, [dispatch, location]);

  if(status==STATUS.FAILED){
    return (
      <div className="max-w-screen-xl mx-4 xl:mx-auto py-4 h-full flex items-center flex-col">
        <p className="text-lg text-medium text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="flex-grow w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {listings.map((property, index) => (
          <PropertyCard key={index} {...property} screen="listings" />
        ))}
      </div>
    </div>
  );
};

export default AllListings;
