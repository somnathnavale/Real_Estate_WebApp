import React, { useEffect } from 'react'
import { axiosPublic } from '../../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { getListings } from '../../redux/listings/listingSlice';

const Listings = () => {
  const dispatch=useDispatch();
  const {listings}=useSelector(store=>store.listing);

  useEffect(()=>{
    dispatch(getListings({axios:axiosPublic}));
  },[dispatch])

  useEffect(()=>{
    console.log(listings);
  },[listings])
  
  return (
    <div>
      <div>filter</div>
      <div>listings</div>
      {JSON.stringify(listings)}
    </div>
  )
}

export default Listings