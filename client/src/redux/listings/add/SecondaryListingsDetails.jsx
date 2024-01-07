import { memo } from "react";
import { property } from "../../../utils/constants/listings";
import TextInput from "../../../components/Inputs/TextInput";
import Dropdown from "../../../components/Inputs/Dropdown";
import { useSelector } from "react-redux";

const SecondaryListingsDetails = memo(({ propertyData, handleChange }) => {
  const { enums } = useSelector((store) => store.enum);
  console.log(property.category !== enums?.category?.COMMERCIAL);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <h2 className="text-2xl font-semibold text-center text-slate-700 sm:col-span-2">
        Secondary Details
      </h2>
      <div>
        <TextInput
          input="number"
          data={propertyData}
          field={property.propertyAge}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextInput
          input="number"
          data={propertyData}
          field={property.floor}
          onChange={handleChange}
        />
      </div>
      <div>
        <Dropdown
          data={propertyData}
          field={property.furnishing}
          onChange={handleChange}
          options={enums?.furnishing || []}
        />
      </div>
      <div>
        <Dropdown
          data={propertyData}
          field={property.lift}
          onChange={handleChange}
          options={enums?.lift || []}
        />
      </div>
      <div>
        <Dropdown
          data={propertyData}
          field={property.facing}
          onChange={handleChange}
          options={enums?.facing || []}
        />
      </div>
      {property.category === enums?.category?.COMMERCIAL ? (
        <>
          <div>
            <TextInput
              input="number"
              data={propertyData}
              field={property.bathroom}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextInput
              input="number"
              data={propertyData}
              field={property.bedroom}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextInput
              input="number"
              data={propertyData}
              field={property.balcony}
              onChange={handleChange}
            />
          </div>
        </>
      ) : null}
      <div>
        <TextInput
          input="number"
          data={propertyData}
          field={property.parking}
          onChange={handleChange}
        />
      </div>
      <div>
        <Dropdown
          data={propertyData}
          field={property.waterAvailability}
          onChange={handleChange}
          options={enums?.waterAvailability || []}
        />
      </div>
      <div>
        <Dropdown
          data={propertyData}
          field={property.electricityAvailability}
          onChange={handleChange}
          options={enums?.electricityAvailability || []}
        />
      </div>
    </div>
  );
});

SecondaryListingsDetails.displayName = SecondaryListingsDetails;

export default SecondaryListingsDetails;
