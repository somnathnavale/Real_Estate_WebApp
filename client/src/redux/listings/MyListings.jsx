import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteListing, getMyListing } from "./listingService";
import { STATUS } from "../../utils/constants/common";
import noimage from "../../assets/noimage.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { axiosPublic } from "../../api/axios";
import {storage} from "../../firebase";
import {ref, deleteObject } from "firebase/storage"
import Pagination from "../../components/Pagination";

const MyListings = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [page,setPage]=useState(1);
  const [count,setCount]=useState(0);
  const [selectedListing, setSelectedListing] = useState({});
  const { user } = useSelector((store) => store.user);
  const { mylistings, error } = useSelector((store) => store.listing);
  const dispatch = useDispatch();
  const callRef = useRef(false);
  const navigate = useNavigate();
  const axios = useAxios(axiosPublic);

  useEffect(() => {
    if (!callRef.current) {
      setStatus(STATUS.LOADING);
      callRef.current = true;
      const filter={ userId: user._id,page};
      dispatch(getMyListing(filter))
        .unwrap()
        .then((data) => {
          setStatus(STATUS.SUCCEEDED);
          setCount(data?.count);
        })
        .catch(() => {
          setStatus(STATUS.FAILED);
        }).finally(()=>{
          callRef.current=false;
        })
    }
  }, [dispatch, mylistings,page]);

  const handleDeleteImage=async(urls)=>{
    const deletePromise = urls.map((url, index) => {
        const delRef = ref(storage, url);
        return deleteObject(delRef);
      }
    );
    try {
      await Promise.all(deletePromise);
    } catch (error) {
        throw error
    }
  }

  const handleDelete = () => {
    setOpen(false);
    handleDeleteImage(selectedListing?.photos)
    setStatus(STATUS.LOADING);
    dispatch(deleteListing({ axios, id: selectedListing?._id }))
      .unwrap()
      .then(async() => {
        try {
          await handleDeleteImage(selectedListing?.photos)
          setStatus(STATUS.SUCCEEDED);
        } catch (error) {
          throw error;
        }
      })
      .catch(() => {
        setStatus(STATUS.FAILED);
      });
  };

  return (
    <>
      <ConfirmationModal
        header="Delete Listing"
        body="Are you sure you want to delete this property?"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleDelete}
        submitBtnText="Yes, Delete"
        warningMsg={
          "By Deleting this Listing, you won't be able access it again."
        }
      />
      <div className="max-w-4xl ">
        <h3 className="mb-4 text-xl lg:text-2xl text-center font-semibold text-slate-700">
          Your Listed Properties
        </h3>
        {error && (
          <p className="text-lg text-medium text-red-600 text-center">
            {error}
          </p>
        )}
        {mylistings.length ? (
          mylistings.map((property, index) => (
            <div
              className="grid grid-cols-8 rounded p-4 bg-[#f2f2f2] mb-4"
              key={index}
              onClick={() => navigate(`/listings/${property._id}`)}
            >
              <div className="max-h-48 xs:max-h-24 col-span-full xs:col-span-2 cursor-pointer">
                <img
                  src={property?.photos[0] || noimage}
                  className="h-full w-full"
                  alt="property image"
                />
              </div>
              <div className="col-span-full xs:col-span-4 xs:px-4">
                <p
                  title={property.name}
                  className="font-medium text-lg cursor-pointer"
                >
                  {property.name.length > 35
                    ? property.name.slice(0, 33) + "..."
                    : property.name}
                </p>
                <p
                  title={property.address}
                  className="text-slate-500 cursor-pointer"
                >
                  {property.address.length > 80
                    ? property.address.slice(0, 78) + "..."
                    : property.address}
                </p>
              </div>
              <button
                disabled={status}
                className="col-span-1 sm:col-span-1 my-2 sm:my-8 mx-1 flex justify-center max-h-10 items-center bg-blue-500 text-white md:px-2 py-1 rounded hover:opacity-90"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/listings/update/${property._id}`);
                }}
                title="Edit Property"
              >
                <FaEdit className="h-5 w-5 lg:mr-1" />
                <span className="hidden lg:block"> Edit</span>
              </button>
              <button
                className="col-span-1 sm:col-span-1 my-2 sm:my-8 mx-1 flex justify-center max-h-10 items-center bg-red-500 text-white md:px-2 py-1 rounded hover:opacity-90"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedListing(property);
                  setOpen(true);
                }}
                title="Delete Property"
              >
                <FaTrash className="h-5 w-5 lg:mr-1" />
                <span className="hidden lg:block"> Delete</span>
              </button>
            </div>
          ))
        ) : (
          <p className="text-lg text-medium">No Property added</p>
        )}
      </div>
      <Pagination page={page} limit={6} handleChange={(val)=>setPage(val)} count={count}/>
    </>
  );
};

export default MyListings;
