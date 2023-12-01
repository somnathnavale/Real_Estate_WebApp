import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListings } from "../redux/listings/listingService";
import {updatePage} from "../redux/filter/filterSlice";

const Pagination = () => {
  const { count ,listings} = useSelector((store) => store.listing);
  const { limit, page } = useSelector((store) => store.filter);

  const dispatch = useDispatch();
  const pages = Math.ceil(count / limit);

  const handleChange=(val)=>{
    dispatch(updatePage(val));
    dispatch(getListings());
  }

  return (
    <div className="mt-4 flex justify-center text-lg">
      <span
        onClick={() => handleChange(page-1)}
        className={`${
          page == 1 ? "hidden" : "inline"
        } px-4 py-2 bg-white cursor-pointer hover:bg-slate-200 border border-gray-300`}
      >
        Prev
      </span>
      {[...Array(pages)].map((_, id) => (
        <span
          key={id}
          onClick={() => handleChange(id+1)}
          className={`${
            id + 1 === page ? "bg-slate-700 text-white" : "bg-white"
          } px-4 py-2 cursor-pointer hover:bg-slate-${
            id + 1 === page ? "700" : "200"
          } border border-gray-300`}
        >
          {id + 1}
        </span>
      ))}
      <span
        onClick={() => handleChange(page+1)}
        className={`${
          page == pages ? "hidden" : "inline"
        } px-4 py-2 bg-white cursor-pointer hover:bg-slate-200 border border-gray-300`}
      >
        Next
      </span>
    </div>
  );
};

export default Pagination;
