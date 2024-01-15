import { memo } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Tooltip from "../Tooltip";

const Dropdown = memo(({ data, field, onChange, options }) => {
  return (
    <>
      <label
        htmlFor={field.key}
        className={`flex items-center justify-between mx-1 ${
          field?.required ? "text-gray-700 font-normal" : "text-gray-500"
        } `}
      >
        {`${field.label}${field?.required ? " *" : ""}`}
        {`${field.info}` ? (
          <Tooltip message={field.info}>
            <IoMdInformationCircleOutline className=" cursor-pointer w-5 h-5" />
          </Tooltip>
        ) : null}
      </label>
      <select
        id={field.key}
        name={field.key}
        required={field.required}
        value={data[field.key]}
        onChange={onChange}
        className="w-full p-2 border rounded outline-none focus:border-gray-500 "
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((option) => (
          <option
            key={option.key}
            value={option.value}
            className="hover:bg-slate-300"
          >
            {option.value}
          </option>
        ))}
      </select>
    </>
  );
});

Dropdown.displayName = Dropdown;
export default Dropdown;
