import React, { useEffect, useRef } from "react";
import Carousel from "../../components/Carousel";

import { useDispatch, useSelector } from "react-redux";
import ListingPrimaryDetails from "./ListingPrimaryDetails";
import ListingSecondaryDetails from "./ListingSecondaryDetails";
import { useParams } from "react-router-dom";
import { getListing } from "./listingService";
import PropertyCard from "../../components/PropertyCard";

const ListingPage = () => {
  const { id } = useParams();
  const { listing, listings } = useSelector((store) => store.listing);
  const dispatch = useDispatch();
  const callRef = useRef(false);

  useEffect(() => {
    console.log(callRef);
    if (!callRef.current) {
      callRef.current = true;
      dispatch(getListing({ id }));
    }
  }, [dispatch]);

  useEffect(()=>{
    console.log("hello");
  },[])

  return (
    <div className="max-w-screen-xl mx-4 xl:mx-auto my-4">
      <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row">
        <div className="w-full lg:w-1/2 sm:p-4">
          <Carousel />
        </div>
        <div className="w-full lg:w-1/2 sm:p-4">
          <ListingPrimaryDetails listing={listing} />
        </div>
      </div>
      <hr className="sm:hidden my-4 border" />
      <ListingSecondaryDetails listing={listing} />
      <hr className="my-4 border" />
      <div>
        <h2 className="text-lg lg:text-xl font-semibold">Similar Properties</h2>
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2  sm:grid-cols-3  lg:grid-cols-4 gap-8 mt-2">
          {listings
            .filter(
              (curr) =>
                curr._id !== id &&
                curr.category === listing.category &&
                curr.listingType == listing.listingType
            )
            .map((property, index) => (
              <PropertyCard key={index} {...property} screen="listings" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
