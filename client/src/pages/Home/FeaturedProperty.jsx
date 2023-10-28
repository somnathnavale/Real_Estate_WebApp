import React from 'react';
import home from '../../assets/home.png';
import office from '../../assets/office.png';
import villa from '../../assets/villa.png';
import apartment from '../../assets/apartment.png';

const FeaturedProperty = () => {
  const propertyTypes = [
    {
      type: 'Apartments',
      image: apartment,
      listings: 150,
    },
    {
      type: 'Houses',
      image: home,
      listings: 80,
    },
    {
      type: 'Condos',
      image: villa,
      listings: 50,
    },
    {
      type: 'Commercial',
      image: office,
      listings: 30,
    },
  ];

  return (
    <section className="bg-[#F7F9FC] py-8 sm:py-16">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700">Featured Property Types</h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 ">Find All Type of Property.</p>
        </div>
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          {propertyTypes.map((property, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-4 rounded-lg hover:shadow-xl transition duration-300 w-[200px] mx-auto flex flex-col justify-center items-center"
            >
              <img
                src={property.image}
                alt={property.type}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold">{property.type}</h3>
              <p className="text-sm text-gray-600">{property.listings} Listings</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperty;
