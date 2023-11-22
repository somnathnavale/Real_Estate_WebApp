import React from 'react';
import { useSelector } from 'react-redux';

const FeaturedProperty = () => {
  const {featuredListings}=useSelector(store=>store.listing);

  return (
    <section className="bg-[#F7F9FC] py-8 sm:py-16">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700">Featured Property Types</h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 ">Find All Type of Property.</p>
        </div>
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          {featuredListings.map((property, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-4 rounded-lg hover:shadow-xl transition duration-300 w-[200px] mx-auto flex flex-col justify-center items-center"
            >
              <img
                src={`/src/assets/${property.type.toLowerCase()}.png`}
                alt={property.type}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold">{property.type}</h3>
              <p className="text-sm text-gray-600">{property.count} {property.count>1?"Listings":"Listing"}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperty;
