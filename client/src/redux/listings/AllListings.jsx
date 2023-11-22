import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListings } from './listingSlice';
import { useLocation } from 'react-router-dom';
import PropertyCard from '../../components/PropertyCard';

const AllListings = () => {
  const dispatch=useDispatch();
  const callRef=useRef(false);
  const {listings}=useSelector(store=>store.listing);
  const location=useLocation();

  useEffect(()=>{
    const fetch=()=>{
      dispatch(getListings());
    }
    if(!callRef.current){
      fetch();
      callRef.current=true
    }
  },[dispatch,location])

  return (
    <div className='flex-grow w-full'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {listings.map((property, index) => (
            <PropertyCard key={index} {...property} screen="listings"/> 
          ))}
        </div>
    </div>
  )
}

export default AllListings