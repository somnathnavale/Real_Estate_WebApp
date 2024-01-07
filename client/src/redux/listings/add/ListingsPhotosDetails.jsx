import { memo } from "react";
import UploadImage from "../../../components/Inputs/UploadImage";
import TextInput from "../../../components/Inputs/TextInput";
import { property } from "../../../utils/constants/listings";

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
    return (
      <div>
        <h2 className="text-2xl font-semibold text-center text-slate-700">
          Other Information
        </h2>
        <TextInput
          input="textarea"
          data={propertyData}
          field={property.description}
          onChange={handleChange}
        />
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
