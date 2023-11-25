import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Carousel from "../../components/Carousel";

import { useSelector } from "react-redux";
import ListingPrimaryDetails from "./ListingPrimaryDetails";
import ListingSecondaryDetails from "./ListingSecondaryDetails";

const listing = {
  _id: "655cb1fa4ba52f6a15d3832e",
  name: "3BHK Apartment",
  address: "Nyati Properties, Kharadi, 411048, Pune, Maharashtra",
  description: "Fully funrnished 3BHK House for Sale",
  photos: [],
  category: "Apartment",
  listingType: "Sale",
  status: "Available",
  availability: 0,
  carpetArea: 1200,
  furnishing: "Fully-furnished",
  price: 16000000,
  floor: 8,
  facing: "North",
  lift: "Yes",
  bed: 3,
  bathrooms: 3,
  balcony: 2,
  parking: 2,
  waterAvailability: "Always",
  electricityAvailability: "Always",
  owner: {
    _id: "6553607b96da1bcf380ecf6a",
    username: "user",
    email: "user@mail.com",
  },
  createdAt: "2023-11-21T13:34:50.559Z",
  updatedAt: "2023-11-21T13:34:50.559Z",
};

const ListingPage = () => {

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
