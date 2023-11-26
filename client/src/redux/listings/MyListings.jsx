import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyListing } from "./listingService";
import PropertyCard from "../../components/PropertyCard";
import { updateListingStatus } from "./listingSlice";

const MyListings = () => {
  const { user } = useSelector((store) => store.user);
  const { mylistings,status } = useSelector((store) => store.listing);
  const dispatch = useDispatch();
  const callRef = useRef(false);

  useEffect(() => {
    if (mylistings.length == 0 && !callRef.current) {
      callRef.current = true;
      dispatch(getMyListing({ userId: user._id }));
    }

    return ()=>{
      dispatch(updateListingStatus('idle'));
    }
  }, [dispatch, mylistings]);

  
  if(mylistings.length===0 && status!=='loading'){
    return <p className="text-lg text-medium">No listings added</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {mylistings.map((property, index) => (
        <PropertyCard key={index} {...property} screen="listings" />
      ))}
    </div>
  );
};

export default MyListings;
