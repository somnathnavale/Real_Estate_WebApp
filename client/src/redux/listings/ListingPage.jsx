import { useEffect, useRef, useState } from "react";
import Carousel from "../../components/Carousel";

import { useDispatch, useSelector } from "react-redux";
import ListingPrimaryDetails from "./ListingPrimaryDetails";
import ListingSecondaryDetails from "./ListingSecondaryDetails";
import { Link, useParams } from "react-router-dom";
import { getListing } from "./listingService";
import { STATUS } from "../../utils/constants/common";
import SimilarListings from "./SimilarListings";

const ListingPage = () => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const { id } = useParams();
  const { listing, error } = useSelector((store) => store.listing);
  const dispatch = useDispatch();
  const callRef = useRef(false);

  useEffect(() => {
    if (!callRef.current) {
      setStatus(STATUS.LOADING);
      callRef.current = true;
      dispatch(getListing({ id }))
        .unwrap()
        .catch(() => {
          setStatus(STATUS.FAILED);
        })
        .finally(() => {
          callRef.current = false;
        });
    }
    return () => {
      // callRef.current=false;
    };
  }, [dispatch, id]);

  if (!Object.keys(listing).length && status === STATUS.FAILED) {
    return (
      <div className="max-w-screen-xl mx-4 xl:mx-auto py-4 h-full flex items-center flex-col">
        <p className="text-lg text-medium text-red-600">{error}</p>
        <Link
          to="/listings"
          className="underline underline-offset-2 text-blue-800"
        >
          View Other Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-4 xl:mx-auto py-4 h-full">
      <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row">
        <div className="w-full lg:w-1/2 sm:p-4">
          <Carousel photos={listing?.photos || []} />
        </div>
        <div className="w-full lg:w-1/2 sm:p-4">
          <ListingPrimaryDetails listing={listing} />
        </div>
      </div>
      <hr className="sm:hidden my-4 border" />
      <ListingSecondaryDetails listing={listing} />
      <hr className="border my-4" />
      <SimilarListings listing={listing} />
    </div>
  );
};

export default ListingPage;
