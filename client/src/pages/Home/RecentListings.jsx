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
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {recentListings.map((property, index) => (
            <PropertyCard key={index} {...property}/> 
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentListings
