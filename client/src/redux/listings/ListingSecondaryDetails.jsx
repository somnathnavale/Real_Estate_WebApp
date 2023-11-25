import React from "react";

import {
  FaBed,
  FaCar,
  FaWater,
  FaBolt,
  FaBath,
  FaCompass,
} from "react-icons/fa";
import { MdBalcony } from "react-icons/md";
import { GiStairs, GiLift } from "react-icons/gi";
import ListingFeature from "../../components/ListingFeature";

const ListingSecondaryDetails = ({listing}) => {
  return (
    <div className="w-full p-0 lg:p-4 mt-4 lg:0">
      <h2 className="text-lg lg:text-xl font-semibold">More details</h2>
      <p className="mt-1 indent-4">{listing.description}</p>
      <hr className="my-2 border" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 mt-2">
        <ListingFeature Icon={GiStairs} label="Floor" value={listing.floor} />
        <ListingFeature
          Icon={FaCompass}
          label="Facing"
          value={listing.facing}
        />
        <ListingFeature Icon={GiLift} label="Lift" value={listing.lift} />
        <ListingFeature Icon={FaBed} label="Bedrooms" value={listing.bed} />
        <ListingFeature
          Icon={FaBath}
          label="Bathrooms"
          value={listing.bathrooms}
        />
        <ListingFeature
          Icon={MdBalcony}
          label="Balconies"
          value={listing.balcony}
        />
        <ListingFeature Icon={FaCar} label="Parking" value={listing.parking} />
        <ListingFeature
          Icon={FaWater}
          label="Water Availability"
          value={`${listing.waterAvailability} Availabile`}
        />
        <ListingFeature
          Icon={FaBolt}
          label="Electricity Availability"
          value={`${listing.electricityAvailability} Availabile`}
        />
      </div>
    </div>
  );
};

export default ListingSecondaryDetails;
