import React, { useEffect, useRef, useState } from "react";
import Carousel from "../../components/Carousel";

import { useDispatch, useSelector } from "react-redux";
import ListingPrimaryDetails from "./ListingPrimaryDetails";
import ListingSecondaryDetails from "./ListingSecondaryDetails";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteListing, getListing } from "./listingService";
import PropertyCard from "../../components/PropertyCard";
import { updateListingStatus } from "./listingSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmationModal from "../../components/ConfirmationModal";
import useAxios from "../../hooks/useAxios";
import { axiosPublic } from "../../api/axios";

const ListingPage = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { listing, listings, status } = useSelector((store) => store.listing);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const callRef = useRef(false);
  const navigate = useNavigate();
  const axios = useAxios(axiosPublic);
  const location = useLocation();

  useEffect(() => {
    if (!callRef.current) {
      callRef.current = true;
      dispatch(getListing({ id }));
    }
    return () => {
      dispatch(updateListingStatus("idle"));
    };
  }, [dispatch]);

  const handleUpdate = () => {
    if (user && listing && user?._id !== listing?.owner?._id) return;
    navigate("/listings/update");
  };

  const handleDelete = () => {
    if (user && listing && user?._id !== listing?.owner?._id) return;
    setOpen(false);
    dispatch(deleteListing({axios,id:listing?._id})).then(()=>{
      navigate(`${location?.state?.from?.pathname || '/listings'}`)
    })
  };

  if (status === "loading" || status==="idle") {
    <div className="max-w-screen-xl mx-4 xl:mx-auto py-4 h-full">
      <p className="text-lg text-medium">Fetching the Property</p>
    </div>;
  }

  if (!Object.keys(listing).length && status !== "loading") {
    return (
      <div className="max-w-screen-xl mx-4 xl:mx-auto py-4 h-full">
        <p className="text-lg text-medium">No Property With given Id</p>
      </div>
    );
  }

  return (
    <>
      <ConfirmationModal
        header="Delete Listing"
        body="Are you sure you want to delete this property?"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleDelete}
        submitBtnText="Yes, Delete"
        warningMsg={
          "By Deleting this Listing, you won't be able access it again."
        }
      />
      <div className="max-w-screen-xl mx-4 xl:mx-auto py-4 h-full">
        <div
          className={`${
            user && listing && user?._id === listing?.owner?._id
              ? "flex"
              : "hidden"
          } space-x-2 mb-4 md:mb-0 justify-end`}
        >
          <button
            className="flex items-center bg-blue-500 text-white px-2 py-1 rounded hover:opacity-90"
            onClick={handleUpdate}
            title="update"
          >
            <FaEdit className="mr-1" /> Update
          </button>
          <button
            className="flex items-center bg-red-500 text-white px-2 py-1 rounded hover:opacity-90"
            onClick={() => setOpen(true)}
            title="delete"
          >
            <FaTrash className="mr-1" /> Delete
          </button>
        </div>
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
        <div className="mt-2">
          <h2 className="text-lg lg:text-xl font-semibold">
            Similar Properties
          </h2>
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
    </>
  );
};

export default ListingPage;
