import React, { useEffect, useState } from "react";
import { axiosPublic } from "../../api/axios";
import PropertyCard from "../../components/PropertyCard";
import { ErrorHandler } from "../../utils/helpers/asyncHandlers";

const SimilarListings = ({ listing }) => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const filter = {
          category: listing?.category,
          listingType: listing?.listingType,
          limit: 10,
        };
        const response = await axiosPublic.get("/api/listings", {
          params: filter,
        });
        setListings(
          response?.data?.listings?.filter((lis) => lis._id != listing._id)
        );
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
        <div className="flex overflow-x-auto pb-4 mt-4">
          {listings.map((property, index) => (
            <div key={property._id} className="px-2 min-w-[320px]">
              <PropertyCard key={index} {...property} screen="listings" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimilarListings;
