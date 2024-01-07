import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { defaultPropertyData } from "../../../utils/constants/listings";
import { axiosPublic } from "../../../api/axios";
import useAxios from "../../../hooks/useAxios";
import useFile from "../../../hooks/useFile";
import { STATUS } from "../../../utils/constants/common";
import { getListing, updateListing } from "../listingService";
import Snackbar from "../../../components/Snackbar";
import PageRenderer from "./PageRenderer";
import ButtonGroup from "./ButtonGroup";

const UpdateListing = memo(() => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(STATUS.IDLE);
  const { error } = useSelector((store) => store.listing);
  const [propertyData, setPropertyData] = useState({
    ...structuredClone(defaultPropertyData),
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { error: enumError } = useSelector((store) => store.enum);
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const axios = useAxios(axiosPublic);
  const callRef = useRef(false);
  const { handleFileUpload } = useFile();

  const fetch = useCallback(() => {
    setStatus(STATUS.LOADING);
    callRef.current = true;
    dispatch(getListing({ id }))
      .unwrap()
      .then((response) => {
        const cloned=response?.listing;
        setPropertyData((prev) => ({
          ...prev,
          ...cloned,
          locality: cloned?.address?.locality,
          street: cloned?.address?.street,
          city: cloned?.address?.city,
          state: cloned?.address?.state,
          country: cloned?.address?.country,
          zipCode: cloned?.address?.zipCode,
        }));
        setStatus(STATUS.IDLE);
      })
      .catch(() => {
        setStatus(STATUS.FAILED);
      });
  }, [dispatch, id]);

  useEffect(() => {
    if (!callRef.current) {
      fetch();
    }
  }, [dispatch, fetch]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setStatus(STATUS.LOADING);
        let addedPhotos = [];
        if (selectedFiles.length) {
          const response = await handleFileUpload(selectedFiles);
          if (!response.success) {
            setStatus(STATUS.IDLE);
            return;
          }
          setSelectedFiles([]);
          addedPhotos = response.filesUrls;
        }
        const addressObj = {
          locality: propertyData?.locality,
          street: propertyData?.street,
          city: propertyData?.city,
          state: propertyData?.state,
          country: propertyData?.country,
          zipCode: propertyData?.zipCode,
        };
        setPropertyData((prev) => ({
          ...prev,
          address: addressObj,
          photos: [...addedPhotos, ...prev.photos],
        }));
        await dispatch(
          updateListing({
            axios,
            data: {
              ...propertyData,
              address: addressObj,
              photos: [...addedPhotos, ...propertyData.photos],
              owner: user._id,
            },
          })
        ).unwrap();
        setStatus(STATUS.SUCCEEDED);
        setSelectedFiles([]);
      } catch (error) {
        console.log(error);
        setStatus(STATUS.FAILED);
      }
    },
    [axios, dispatch, handleFileUpload, user?._id, propertyData, selectedFiles]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handlePageClick = useCallback((val) => {
    setPage((prev) => prev + val);
  }, []);

  const handleSnackbar = () => {
    let message =
      status === STATUS.FAILED || enumError
        ? error || enumError
        : status === STATUS.SUCCEEDED
        ? "Property Updated Successfully"
        : "";
    let type =
      status === STATUS.FAILED || enumError
        ? "error"
        : status === STATUS.SUCCEEDED
        ? "success"
        : "none";
    let open =
      status === STATUS.FAILED || status === STATUS.SUCCEEDED || enumError;
    let onClose = () => {
      setStatus(STATUS.IDLE);
    };
    return {
      message,
      type,
      open,
      onClose,
      time: type === "error" ? 6000 : 1500,
    };
  };

  return (
    <div className="w-[100%] max-w-xl mx-auto my-6 p-6 bg-[#F7F9FC] shadow-md rounded-lg">
      <Snackbar {...handleSnackbar()} />
      <form>
        <PageRenderer
          page={page}
          propertyData={propertyData}
          handleChange={handleChange}
          setPropertyData={setPropertyData}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          status={status}
          setStatus={setStatus}
        />
        <ButtonGroup
          page={page}
          handlePageClick={handlePageClick}
          status={status}
          handleSubmit={handleSubmit}
        />
      </form>
    </div>
  );
});

UpdateListing.displayName = UpdateListing;

export default UpdateListing;
