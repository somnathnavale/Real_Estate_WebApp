import { memo } from "react";
import { property } from "../../../utils/constants/listings";
import TextInput from "../../../components/Inputs/TextInput";

const AddressListingsDetails = memo(({ propertyData, handleChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <h2 className="text-2xl font-semibold text-center text-slate-700 sm:col-span-2">
        Address Details
      </h2>
      <div className="sm:col-span-2">
        <TextInput
          input="text"
          data={propertyData}
          field={property.locality}
          onChange={handleChange}
        />
      </div>
      <div className="sm:col-span-2">
        <TextInput
          input="text"
          data={propertyData}
          field={property.street}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextInput
          input="text"
          data={propertyData}
          field={property.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextInput
          input="number"
          data={propertyData}
          field={property.zipCode}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextInput
          input="text"
          data={propertyData}
          field={property.state}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextInput
          input="text"
          data={propertyData}
          field={property.country}
          onChange={handleChange}
        />
      </div>
    </div>
  );
});

AddressListingsDetails.displayName = AddressListingsDetails;

export default AddressListingsDetails;
