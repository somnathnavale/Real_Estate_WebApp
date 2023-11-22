import React from 'react'
import PropertyCard from '../../components/PropertyCard';
import { useSelector } from 'react-redux';

const RecentListings = () => {
  const {recentListings}=useSelector(store=>store.listing);
  
  return (
    <section className="bg-[#FFF] py-8 sm:py-16">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700">Recently Listed Properties</h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 ">Find All Recently Added Listings</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-4">
          {recentListings.map((property, index) => (
            <PropertyCard key={index} {...property} screen="home"/> 
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentListings
