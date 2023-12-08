import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaQuestionCircle,
  FaCalendarAlt,
  FaCrown,
} from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { BiSolidArea, BiSolidCategory } from "react-icons/bi";
import { GiSofa } from "react-icons/gi";
import { IoMdPricetags } from "react-icons/io";
import ListingFeature from "../../components/ListingFeature";
import InformationModal from "../../components/InformationModal";

const ListingPrimaryDetails = ({ listing }) => {
  const [open, setOpen] = useState(false);
  const { enumConst } = useSelector((store) => store.enum);
  const { user } = useSelector((store) => store.user);
  const location = useLocation();

  return (
    <>
      <InformationModal
        open={open}
        onClose={() => setOpen(false)}
        owner={listing?.owner}
      />
      <h1 className="text-2xl lg:text-3xl font-bold">{listing.name}</h1>
      <p className="text-gray-500">{listing.address}</p>
      <hr className="my-4 " />
      <div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <ListingFeature
            Icon={FaHome}
            label="Property Category"
            value={listing?.category}
          />
          <ListingFeature
            Icon={BiSolidCategory}
            label="Listed For"
            value={listing?.listingType}
          />
          <ListingFeature
            Icon={FaQuestionCircle}
            label="Status"
            value={
              listing?.status === enumConst?.status?.AVAILABLE
                ? "Available"
                : listing.listingType === enumConst?.listingType?.SALE
                ? "Sold Out"
                : "Rented out"
            }
          />
          <ListingFeature
            Icon={MdEventAvailable}
            label="Availabile On"
            value={
              listing?.createdAt
                ? `${new Date(
                    new Date(listing.createdAt).getTime() +
                      listing.availability * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("en-GB")}`
                : ""
            }
          />
          <ListingFeature
            Icon={FaCalendarAlt}
            label="Posted On"
            value={
              listing?.createdAt
                ? new Date(listing.createdAt).toLocaleDateString("en-GB")
                : ""
            }
          />
          <ListingFeature
            Icon={BiSolidArea}
            label="Carpet Area"
            value={`${listing?.carpetArea} sq. ft.`}
          />
          <ListingFeature
            Icon={GiSofa}
            label="Furnishing"
            value={listing?.furnishing}
          />
          <ListingFeature
            Icon={IoMdPricetags}
            label="Price"
            value={
              listing.price !== undefined
                ? `${listing?.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  })} ${
                    listing.listingType === enumConst?.listingType?.SALE
                      ? ""
                      : "Per Month"
                  }`
                : ""
            }
          />
        </div>
        <hr className="mt-4 mb-2" />
        <div className="grid grid-cols-2 sm:grid-cols-3">
          <div className="flex items-center">
            <FaCrown className="mr-2 h-6 w-6 text-slate-400" />
            <span className="font-normal text-gray-500 flex-grow">
              Owner Details :-{" "}
            </span>
          </div>
          {user ? (
            <button
              className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 sm:w-fit bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-base"
              onClick={() => setOpen(true)}
            >
              View Details
            </button>
          ) : (
            <Link
              to="/sign-in"
              className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 sm:w-fit bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-base"
              state={{ from: location }}
            >
              Login First
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ListingPrimaryDetails;
