import React, { useEffect, useState } from "react";
import { axiosPublic } from "../../api/axios";
import PropertyCard from "../../components/PropertyCard";
import { ErrorHandler } from "../../utils/helpers/asyncHandlers";
import { GrPrevious,GrNext } from "react-icons/gr";

const SimilarListings = ({ listing }) => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const filter = {
          category: listing?.category,
          listingType: listing?.listingType,
        };
        const response = await axiosPublic.get("/api/listings", {
          params: filter,
        });
        setListings(response?.data?.listings);
      } catch (error) {
        const err = ErrorHandler(error);
        setError(err?.message);
      }
    };
    fetch();
  }, [listing]);

  return (
    <div className="my-4">
      <h2 className="text-lg lg:text-xl font-semibold">
        Similar Properties by Category
      </h2>
      {error.length ? (
        <p className="text-red text-lg mt-2 text-semibold">{error}</p>
      ) : (
        // <div className="relative">
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2  sm:grid-cols-3  lg:grid-cols-4 gap-8 mt-4">
            {listings.map((property, index) => (
              <PropertyCard key={index} {...property} screen="listings" />
              ))}
          </div>
          // <button onClick={()=>{console.log("hello")}} className="absolute top-1/2 -left-16 transform -translate-y-1/2 w-10 h-10 text-slate-500 bg-slate-200 rounded-[50%] hover:bg-opacity-20 ">
          //   <GrPrevious className='w-full h-full p-1'/>
          // </button>
          // <button onClick={()=>{console.log("bye")}} className="absolute top-1/2 -right-16 transform -translate-y-1/2 w-10 h-10 bg-slate-200 rounded-[50%] hover:bg-opacity-20 z-50">
          //   <GrNext className='w-full h-full p-1'/>
          // </button>
        // </div>
      )}
    </div>
  );
};

export default SimilarListings;
