import { useCallback, useEffect, useState } from "react";
import { defaultPropertyData } from "../../../utils/constants/listings";
import { STATUS, defaultToast } from "../../../utils/constants/common";
import { useDispatch, useSelector } from "react-redux";
import { axiosPublic } from "../../../api/axios";
import useAxios from "../../../hooks/useAxios";
import useFile from "../../../hooks/useFile";
import { addListing } from "../listingService";
import PageRenderer from "./PageRenderer";
import ButtonGroup from "./ButtonGroup";
import { PageValidations } from "../../../utils/helpers/listingsHelper";
import SnackbarToast from "../../../components/SnackbarToast";

const AddListing = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [propertyData, setPropertyData] = useState(
    structuredClone(defaultPropertyData)
  );
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [toast, setToast] = useState(defaultToast);

  const { error: enumError } = useSelector((store) => store.enum);
  const { error: listingError } = useSelector((store) => store.listing);

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const axios = useAxios(axiosPublic);
  const { handleFileUpload } = useFile();

  useEffect(() => {
    let message =
      status === STATUS.FAILED || enumError
        ? listingError || enumError
        : status === STATUS.SUCCEEDED
        ? "Property Addeed Successfully"
        : "";
    let type =
      status === STATUS.FAILED || enumError
        ? "error"
        : status === STATUS.SUCCEEDED
        ? "success"
        : "none";
    let open =
      status === STATUS.FAILED || status === STATUS.SUCCEEDED || enumError;
    setToast({
      message,
      open,
      type,
      time: type === "error" ? 6000 : 1500,
    });
  }, [listingError, enumError, status]);

  const handleChange = useCallback((e) => {
    setToast(defaultToast);
    const { name, value } = e.target;
    setPropertyData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
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
        photos: addedPhotos,
      }));
      await dispatch(
        addListing({
          axios,
          data: {
            ...propertyData,
            address: addressObj,
            photos: addedPhotos,
            owner: user._id,
          },
        })
      ).unwrap();
      setStatus(STATUS.SUCCEEDED);
      setPropertyData(structuredClone(defaultPropertyData));
    } catch (error) {
      setStatus(STATUS.FAILED);
    }
  };

  const onToastClose = useCallback(() => {
    setToast(defaultToast);
  }, []);

  const handlePageClick = useCallback(
    (val) => {
      if (val == 1) {
        const response = PageValidations(propertyData, page);
        if (response?.status) {
          setToast({
            type: "warning",
            message: response.message,
            time: 2000,
            open: true,
          });
          return;
        }
      }
      setPage((prev) => prev + val);
    },
    [page, propertyData]
  );

  return (
    <div className="w-[100%] max-w-xl mx-auto my-6 p-6 bg-[#F7F9FC] shadow-md rounded-lg">
      <SnackbarToast {...{ ...toast, onClose: onToastClose }} />
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
};

export default AddListing;
