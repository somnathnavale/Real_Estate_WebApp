import React, { useEffect, useRef } from "react";
import Carousel from "../../components/Carousel";

import { useDispatch, useSelector } from "react-redux";
import ListingPrimaryDetails from "./ListingPrimaryDetails";
import ListingSecondaryDetails from "./ListingSecondaryDetails";
import { useParams } from "react-router-dom";
import { getListing } from "./listingSlice";
import Loader from "../../components/Loader";

const ListingPage = () => {
  const {id}=useParams();
  const {listing,status}=useSelector(store=>store.listing);
  const dispatch=useDispatch();
  const callRef=useRef(false);

  useEffect(()=>{
    if(!callRef.current){
      callRef.current=true;
      dispatch(getListing({id}));
    }
  },[dispatch])

  return (
    <div className="max-w-screen-xl mx-4 xl:mx-auto my-4">
      <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row">
        <div className="w-full lg:w-1/2 sm:p-4">
          <Carousel />
        </div>
        <div className="w-full lg:w-1/2 sm:p-4">
          <ListingPrimaryDetails listing={listing}/>
        </div>
      </div>
      <hr className="sm:hidden my-4 border" />
      <ListingSecondaryDetails listing={listing}/>
    </div>
  );
};


export default ListingPage;
