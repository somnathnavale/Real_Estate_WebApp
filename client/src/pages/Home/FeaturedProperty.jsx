import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addField } from "../../redux/filter/filterSlice";
import { useNavigate } from "react-router-dom";

const FeaturedProperty = () => {
  const { featuredListings } = useSelector((store) => store.listing);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (value) => {
    dispatch(addField({ field: "category", value }));
    navigate("/listings");
  };

  return (
    <section className="bg-[#F7F9FC] py-8 sm:py-16">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700">
            Featured Property Types
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 ">
            Find All Type of Property.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          {featuredListings.map((property, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-4 rounded-lg hover:shadow-xl transition duration-300 w-[200px] mx-auto flex flex-col justify-center items-center cursor-pointer"
              onClick={() => handleClick(property.type)}
            >
              <img
                src={`/src/assets/${property.type.toLowerCase()}.png`}
                alt={property.type}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold">{property.type}</h3>
              <p className="text-sm text-gray-600">
                {property.count} {property.count > 1 ? "Listings" : "Listing"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperty;
