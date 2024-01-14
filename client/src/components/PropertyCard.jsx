import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";

const PropertyCard =({
  _id,
  name,
  address,
  price,
  category,
  listingType,
  photos,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { enumConst } = useSelector((store) => store.enum);

  return (
    <div
      className="bg-gray-300 overflow-hidden shadow-lg rounded hover:shadow-2xl transition duration-300"
      onClick={() =>
        navigate(`/listings/${_id}`, { state: { from: location } })
      }
    >
      {/* <img
        className="mx-auto w-auto h-64 cursor-pointer hover:opacity-80"
        src={photos[0] }
        alt={name}
      /> */}
      <div className="mx-auto w-auto h-64 cursor-pointer hover:opacity-80">
        <Carousel photos={photos} />
      </div>
      <div className="bottom-0 w-full bg-white bg-opacity-75 p-4 h-auto">
        <span
          className={`px-3 py-0.5 font-semibold text-base ${
            listingType === enumConst?.listingType?.SALE
              ? "text-white bg-slate-700"
              : "text-slate-800 bg-slate-300"
          }`}
        >
          On {listingType}
        </span>
        <h2
          className="text-base lg:text-lg font-semibold text-slate-800 mt-1"
          title={name}
        >
          {name.substring(0, 30)}
        </h2>
        <p className="text-gray-600" title={address?.locality}>
          {(address?.locality + ", " + address?.city).length > 30
            ? `${(address.locality + ", " + address.city).substring(0, 30)}...`
            : address.locality + ", " + address.city}
        </p>
        <hr className="my-3 border-gray-300" />
        <div className="flex justify-between">
          <p className="text-sm lg:text-base font-semibold bg-green-500 text-white rounded-full px-2 py-1">
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            })}
            {listingType === enumConst?.listingType?.SALE ? "" : "/Month"}
          </p>
          <p className="text-base text-slate-700 self-center font-medium">
            {category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
