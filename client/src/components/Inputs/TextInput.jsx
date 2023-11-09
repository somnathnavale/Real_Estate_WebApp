import React from "react";

const TextInput = ({ input, data, field, onChange }) => {
  return (
    <>
      <label
        htmlFor={field.key}
        className={`block ${
          field?.required ? "text-gray-700 font-normal" : "text-gray-500"
        } `}
      >{`${field.label}${field?.required ? " *" : ""}`}</label>
      {input == "textarea" ? (
        <textarea
          id={field.key}
          name={field.key}
          required={field.required}
          value={data[field.key]}
          onChange={onChange}
          className="p-2 w-full border border-gray-200 rounded outline-none focus:border-gray-500"
          rows="4"
          autoComplete="off"
        ></textarea>
      ) : (
        <input
          type={input}
          min={input==='number'?0:""}
          id={field.key}
          name={field.key}
          required={field.required}
          value={data[field.key]}
          onChange={onChange}
          className="w-full p-2 border rounded outline-none focus:border-gray-500"
          autoComplete="off"
        />
      )}
    </>
  );
};

export default TextInput;
