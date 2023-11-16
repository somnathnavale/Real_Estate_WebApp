import React from "react";

const Dropdown = ({ data, field, onChange, options }) => {
  return (
    <>
      <label
        htmlFor={field.key}
        className={`block ${
          field?.required ? "text-gray-700 font-normal" : "text-gray-500"
        } `}
      >{`${field.label}${field?.required ? " *" : ""}`}</label>
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
          <option key={option.key} value={option.value} className="hover:bg-slate-300">
            {option.value}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
