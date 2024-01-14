import { memo } from "react";
import { property } from "../../../utils/constants/listings";
import TextInput from "../../../components/Inputs/TextInput";
import Dropdown from "../../../components/Inputs/Dropdown";
import { useSelector } from "react-redux";

const CommonListingsDetails = memo(({ propertyData, handleChange }) => {
  const { enums } = useSelector((store) => store.enum);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <h2 className="text-2xl font-semibold text-center text-slate-700 sm:col-span-2">
        Primary Details
      </h2>
      <div className="sm:col-span-2">
        <TextInput
          input="text"
          data={propertyData}
          field={property.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <Dropdown
          data={propertyData}
          field={property.category}
          onChange={handleChange}
          options={enums?.category || []}
        />
      </div>
      <div>
        <Dropdown
          data={propertyData}
          field={property.listingType}
          onChange={handleChange}
          options={enums?.listingType || []}
        />
      </div>
      <div>
        <Dropdown
          data={propertyData}
          field={property.status}
          onChange={handleChange}
          options={enums?.status || []}
        />
      </div>
      <div className="">
        <TextInput
          input="number"
          data={propertyData}
          field={property.availability}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextInput
          input="number"
          data={propertyData}
          field={property.carpetArea}
          onChange={handleChange}
        />
      </div>
      <div className="">
        <TextInput
          input="number"
          data={propertyData}
          field={property.price}
          onChange={handleChange}
        />
      </div>
    </div>
  );
});

CommonListingsDetails.displayName = CommonListingsDetails;

export default CommonListingsDetails;
