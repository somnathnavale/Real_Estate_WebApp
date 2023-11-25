import React from 'react'

const ListingFeature = ({Icon,label,value}) => {
  return (
    <div className="flex flex-col lg:items-center lg:flex-row">
    <div className="flex items-center lg:mr-2">
      <Icon className="mr-2 h-6 w-6 text-slate-400" />
      <span className="font-normal text-gray-500">{label}</span>
      <span className="hidden lg:inline lg:ml-1 text-slate-700 font-bold">
        :-
      </span>
    </div>
    <p className="font-bold text-slate-700 ml-8 lg:ml-0">{value}</p>
  </div>
  )
}

export default ListingFeature