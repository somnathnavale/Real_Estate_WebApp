import React from 'react';
import {useNavigate} from 'react-router-dom';

const PropertyCard = ({ image, propertyName, location, price, propertyCategory,listingType }) => {
  const navigate=useNavigate()
  return (
    <div className="bg-white shadow-md rounded-lg hover:shadow-2xl transition duration-300 overflow-hidden w-[300px] md:w-[360px] m-2 sm:m-0" onClick={()=>navigate(`/properties`)}>
      <div className='relative z-10'>
        <img src={image} alt={propertyName} className="w-full object-cover cursor-pointer" />
        <div className="cursor-pointer opacity-0 hover:opacity-50 bg-gray-300 transition-opacity duration-300 absolute inset-0 flex items-center justify-center"/>
      </div>
      <div className="p-4">
        <span className={`px-3 py-0.5 font-semibold text-base ${listingType==='Sale'?'text-white bg-slate-800':'text-slate-800 bg-slate-300'}`}>For {listingType}</span>
        <h2 className="text-xl font-semibold text-slate-800 mt-1">{propertyName}</h2>
        <p className="text-gray-600">{location}</p>
        <hr className="my-3 border-gray-300" />
        <div className="flex justify-between">
          <p className="text-lg font-semibold bg-green-500 text-white rounded-full px-2 py-1">{price}</p>
          <p className="text-base text-slate-900 self-center font-medium">{propertyCategory}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
