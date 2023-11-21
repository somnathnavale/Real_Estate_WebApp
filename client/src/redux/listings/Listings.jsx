import React, { useEffect, useRef } from 'react'
import { axiosPublic } from '../../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { getListings } from './listingSlice';
import Filter from '../filter/Filter';

const Listings = () => {
  const dispatch=useDispatch();
  const callRef=useRef(false);
  const {listings}=useSelector(store=>store.listing);

  useEffect(()=>{
    const fetch=()=>{
      dispatch(getListings({axios:axiosPublic}));
    }
    if(!callRef.current){
      callRef.current=true
      fetch();
    }
  },[])
  
  return (
    <div className="flex flex-wrap justify-between items-center xl:mx-auto max-w-screen-xl my-4 px-4 lg:px-6 xl:p-0">
      <Filter/>
      <div>listings</div>
    </div>
  )
}

export default Listings