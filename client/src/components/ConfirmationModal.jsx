import React from "react";

const ConfirmationModal = ({
  header,
  body,
  open,
  onClose,
  onSubmit,
  submitBtnText,
  warningMsg,
}) => {
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-full z-30  bg-gray-200 bg-opacity-90`}
    >
      <div className="p-6 min-w-[300px] max-w-sm rounded-lg mx-auto bg-white left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 fixed w-full">
        <p className="text-center font-bold text-lg text-slate-700">{header}</p>
        <p className="font-medium text-normal text-center text-slate-600">
          {body}
        </p>
        <div className="bg-[#FFE9D9] px-2 py-1 border-l-4 border-l-orange-800 mt-2">
          <h4 className="text-[#791808] font-semibold">Warning</h4>
          <h4 className="text-orange-600 text-sm ">{warningMsg}</h4>
        </div>
        <div className="flex justify-between mt-8">
          <button
            className="px-2 py-1 border rounded-lg text-white border-slate-700 bg-slate-700 font-semibold hover:bg-opacity-95 hover:bg-white hover:text-slate-700 hover:border-slate-700"
            onClick={onClose}
          >
            No, Cancel
          </button>
          <button
            className="px-2 py-1 border rounded-lg text-slate-700 border-slate-700 font-semibold hover:bg-slate-700 hover:text-white"
            onClick={onSubmit}
          >
            {submitBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
