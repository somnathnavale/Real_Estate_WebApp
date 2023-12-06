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
    <>
      {open && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[400px] sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      {header}
                    </h3>
                    <p className="font-medium text-normal  text-slate-600">
                      {body}
                    </p>
                    <div className="bg-[#FFE9D9] p-2 border-l-4 border-l-orange-800 mt-3">
                      <h4 className="text-[#791808] font-semibold">Warning</h4>
                      <h4 className="text-orange-600 text-sm ">{warningMsg}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 mb-3 sm:px-6 flex gap-4 sm:gap-0 justify-between">
                <button
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  No, Cancel
                </button>
                <button
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:text-sm"
                  onClick={onSubmit}
                >
                  {submitBtnText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
