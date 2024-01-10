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
import { useSelector } from "react-redux";

const ListingSecondaryDetails = ({ listing }) => {
  const { enumConst } = useSelector((store) => store.enum);
  
  return (
    <div className="w-full p-0 lg:p-4 mt-2 lg:0">
      <h2 className="text-lg lg:text-xl font-semibold">More details</h2>
      <p className="mt-1 indent-4">{listing.description}</p>
      <hr className="my-4 border" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 mt-2">
        {listing.category !== enumConst?.category?.HOUSE &&
        listing.category !== enumConst?.category?.CONDOS ? (
          <>
            <ListingFeature
              Icon={GiStairs}
              label="Floor"
              value={listing.floor}
            />
            <ListingFeature Icon={GiLift} label="Lift" value={listing.lift} />
          </>
        ) : null}
        <ListingFeature
          Icon={FaCompass}
          label="Facing"
          value={listing.facing}
        />
        {listing?.category !== enumConst?.category?.COMMERCIAL ? (
          <>
            <ListingFeature Icon={FaBed} label="Bedrooms" value={listing.bed} />
            <ListingFeature
              Icon={FaBath}
              label="Bathrooms"
              value={listing.bathroom}
            />
            <ListingFeature
              Icon={MdBalcony}
              label="Balconies"
              value={listing.balcony}
            />
          </>
        ) : null}
        <ListingFeature Icon={FaCar} label="Parking" value={listing.parking} />
        <ListingFeature
          Icon={FaWater}
          label="Water"
          value={`${listing.waterAvailability} Availabile`}
        />
        <ListingFeature
          Icon={FaBolt}
          label="Electricity"
          value={`${listing.electricityAvailability} Availabile`}
        />
      </div>
    </div>
  );
};

export default ListingSecondaryDetails;
