import React from "react";
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

const ListingPrimaryDetails = ({ listing }) => {
  const {enumConst}=useSelector(store=>store.enum);
  const { user } = useSelector((store) => store.user);
  const location = useLocation();

  return (
    <>
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
                : listing.listingType === enumConst?.status?.SALE
                ? "Sold Out"
                : "Rented out"
            }
          />
          <ListingFeature
            Icon={MdEventAvailable}
            label="Availabile On"
            value={listing?.createdAt ? `${new Date(
              new Date(listing.createdAt).getTime() +
                listing.availability * 24 * 60 * 60 * 1000
            ).toLocaleDateString("en-GB")}` :""}
          />
          <ListingFeature
            Icon={FaCalendarAlt}
            label="Posted On"
            value={listing?.createdAt ? new Date(listing.createdAt).toLocaleDateString("en-GB"):""}
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
            value={listing.price!==undefined ? `${listing?.price.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              })} ${listing.listingType === enumConst?.status?.SALE ? "" : "Per Month"}`:""}
          />
        </div>
        <hr className="mt-4 mb-2" />
        <div className="flex flex-col lg:items-center lg:flex-row">
          <div className="flex items-center lg:mr-2">
            <FaCrown className="mr-2 h-6 w-6 text-slate-400" />
            <span className="font-normal text-gray-500">Owner Details</span>
            <span className="hidden lg:inline lg:ml-1 text-slate-700 font-bold">
              :-
            </span>
          </div>
          {user ? (
            <p className="font-bold text-slate-700 ml:2">{`${listing.owner.username} (${listing.owner.email})`}</p>
          ) : (
            <Link
              to="/sign-in"
              className=" text-green-700 underline underline-offset-2 hover:text-green-500"
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
