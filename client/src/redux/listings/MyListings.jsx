import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteListing, getMyListing } from "./listingService";
import { STATUS } from "../../utils/constants/common";
import noimage from "../../assets/noimage.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { axiosPublic } from "../../api/axios";
import Pagination from "../../components/Pagination";
import useFile from "../../hooks/useFile";
import Tooltip from "../../components/Tooltip";

const MyListings = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [selectedListing, setSelectedListing] = useState({});
  const { user } = useSelector((store) => store.user);
  const { mylistings, error } = useSelector((store) => store.listing);
  const dispatch = useDispatch();
  const callRef = useRef(false);
  const navigate = useNavigate();
  const axios = useAxios(axiosPublic);
  const { handleFileDelete } = useFile();

  useEffect(() => {
    if (!callRef.current) {
      setStatus(STATUS.LOADING);
      callRef.current = true;
      const filter = { userId: user._id, page };
      dispatch(getMyListing(filter))
        .unwrap()
        .then((data) => {
          setStatus(STATUS.SUCCEEDED);
          setCount(data?.count);
        })
        .catch(() => {
          setStatus(STATUS.FAILED);
        })
        .finally(() => {
          callRef.current = false;
        });
    }
  }, [dispatch, mylistings, page, user._id]);

  const handleDelete = () => {
    setOpen(false);
    setStatus(STATUS.LOADING);
    dispatch(deleteListing({ axios, id: selectedListing?._id }))
      .unwrap()
      .then(async () => {
        try {
          await handleFileDelete(selectedListing?.photos);
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
          <>
            {mylistings.map((property, index) => (
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
                  <Tooltip message={property.name} classes="!p-1 !top-7">
                    <p className="font-medium text-lg cursor-pointer">
                      {property.name.length > 35
                        ? property.name.slice(0, 33) + "..."
                        : property.name}
                    </p>
                  </Tooltip>
                  <Tooltip
                    message={
                      property.address.locality + ", " + property.address.city
                    }
                    classes="!p-1 !bg-slate-500 !top-7"
                  >
                    <p className="text-slate-500 cursor-pointer">
                      {(
                        property.address.locality +
                        ", " +
                        property.address.city
                      ).length > 80
                        ? (
                            property.address.locality +
                            ", " +
                            property.address.city
                          ).slice(0, 78) + "..."
                        : property.address.locality +
                          ", " +
                          property.address.city}
                    </p>
                  </Tooltip>
                </div>
                <button
                  disabled={status === STATUS.LOADING}
                  className="col-span-1 sm:col-span-1 my-2 sm:my-8 mx-1 flex justify-center max-h-10 items-center bg-blue-500 text-white md:px-2 py-1 rounded hover:opacity-90"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/listings/update/${property._id}`);
                  }}
                >
                  <Tooltip
                    message="Edit Property"
                    classes="!w-24 !p-1 !-left-5 !top-8"
                  >
                    <FaEdit className="h-5 w-5 lg:mr-1" />
                    <span className="hidden lg:block"> Edit</span>
                  </Tooltip>
                </button>
                <button
                  disabled={status === STATUS.LOADING}
                  className="col-span-1 sm:col-span-1 my-2 sm:my-8 mx-1 flex justify-center max-h-10 items-center bg-red-500 text-white md:px-2 py-1 rounded hover:opacity-90"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedListing(property);
                    setOpen(true);
                  }}
                >
                  <Tooltip
                    message="Delete Property"
                    classes="!w-28 !p-1 !-left-5 !top-8"
                  >
                    <FaTrash className="h-5 w-5 lg:mr-1" />
                    <span className="hidden lg:block"> Delete</span>
                  </Tooltip>
                </button>
              </div>
            ))}
            <Pagination
              page={page}
              limit={6}
              handleChange={(val) => setPage(val)}
              count={count}
            />
          </>
        ) : (
          <p className="text-lg text-medium text-center">No Property added</p>
        )}
      </div>
    </>
  );
};

export default MyListings;
