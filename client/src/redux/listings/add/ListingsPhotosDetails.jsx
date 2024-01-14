import { memo, useState } from "react";
import UploadImage from "../../../components/Inputs/UploadImage";
import TextInput from "../../../components/Inputs/TextInput";
import { property } from "../../../utils/constants/listings";
import { RiAiGenerate } from "react-icons/ri";
import { createPrompt } from "../../../utils/helpers/listingsHelper";
import useAxios from "../../../hooks/useAxios";
import { axiosPublic } from "../../../api/axios";

const ListingsPhotosDetails = memo(
  ({
    propertyData,
    handleChange,
    setPropertyData,
    selectedFiles,
    setSelectedFiles,
    status,
    setStatus,
  }) => {
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    const axios = useAxios(axiosPublic);

    const generateDescription = async () => {
      const prompt = createPrompt(propertyData);
      try {
        setError("");
        setLoading(true);
        const response = await axios.post(
          "/api/listings/generate/description",
          { prompt }
        );
        const e = {
          target: {
            name: property.description.key,
            value: response.data.description,
          },
        };
        handleChange(e);
      } catch (error) {
        console.log(error);
        setError("Error While generating Description, try again");
      }finally{
        setLoading(false);
      }
    };

    return (
      <div>
        <h2 className="text-2xl font-semibold text-center text-slate-700">
          Other Information
        </h2>
        <p className={`my-1 ${error ? "text-red-500" : "text-slate-500" } ${loading && "loading-dots"} text-center`}>
          {
            loading ? "Generating description using AI " : error?.length >0 ? error : ""
          }
        </p>
        <div className="relative">
          <TextInput
            input="textarea"
            data={propertyData}
            field={property.description}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute top-0 right-1 w-6 h-6 hover:text-slate-500 disabled:text-slate-400"
            title="Generate description using ai"
            onClick={generateDescription}
            disabled={loading}
          >
            {
              <RiAiGenerate className="w-full h-full " />
            }
          </button>
        </div>
        <UploadImage
          propertyData={propertyData}
          setPropertyData={setPropertyData}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          status={status}
          setStatus={setStatus}
        />
      </div>
    );
  }
);

ListingsPhotosDetails.displayName = ListingsPhotosDetails;

export default ListingsPhotosDetails;
