import { useEffect, useRef, useState } from "react";
import { axiosPublic } from "../../api/axios";
import PropertyCard from "../../components/PropertyCard";
import { ErrorHandler } from "../../utils/helpers/asyncHandlers";

const SimilarListings = ({ listing }) => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  const callRef = useRef(false);

  useEffect(() => {
    const fetch = async () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      try {
        const filter = {
          category: listing?.category,
          listingType: listing?.listingType,
          long: listing?.location?.coordinates[0],
          lat: listing?.location?.coordinates[1],
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
      } finally {
        callRef.current = false;
      }
    };
    if (listing._id && !callRef.current) {
      callRef.current = true;
      fetch();
    }
  }, [listing]);

  return (
    <div className="my-4">
      <h2 className="text-lg lg:text-xl font-semibold">
        Similar nearby properties
      </h2>
      {error.length ? (
        <p className="text-red text-lg mt-2 text-semibold">{error}</p>
      ) : (
        <div className="flex overflow-x-auto pb-4 mt-4">
          {listings.length ? (
            listings.map((property, index) => (
              <div
                key={property._id}
                className="px-2 min-w-[320px] max-w-[400px]"
              >
                <PropertyCard key={index} {...property} screen="listings" />
              </div>
            ))
          ) : (
            <p>No Listings available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SimilarListings;
