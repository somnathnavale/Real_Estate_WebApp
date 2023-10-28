import React from 'react'
import PropertyCard from '../../components/PropertyCard';
import background from '../../assets/background.jpg';

const updatedDemoData = [
    {
      image: background,
      propertyName: 'Luxury Villa',
      location: 'Los Angeles, CA',
      price: '$1,200,000',
      listingType: 'Sale',
      propertyCategory: 'Residential',
    },
    {
      image: background,
      propertyName: 'Beachfront Condo',
      location: 'Miami Beach, FL',
      price: '$2,500/month',
      listingType: 'Rent',
      propertyCategory: 'Residential',
    },
    {
      image: background,
      propertyName: 'Downtown Loft',
      location: 'New York, NY',
      price: '$950,000',
      listingType: 'Sale',
      propertyCategory: 'Residential',
    },
    {
      image: background,
      propertyName: 'Commercial Space',
      location: 'San Francisco, CA',
      price: '$1,500,000',
      listingType: 'Rent',
      propertyCategory: 'Commercial',
    },
  ];
  
const RecentListings = () => {

  return (
    <section className="bg-[#FFF] py-8 sm:py-16">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700">Recently Listed Properties</h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 ">Find All Recently Added Listings</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {updatedDemoData.map((property, index) => (
            <PropertyCard key={index} {...property}/> 
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentListings
