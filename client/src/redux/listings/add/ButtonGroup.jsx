import { memo } from "react";
import { STATUS } from "../../../utils/constants/common";

const TOTAL_PAGES = 4;

const ButtonGroup = memo(({ page, handlePageClick, status,handleSubmit }) => {
  return (
    <div className={"flex w-[100%] justify-between mt-4"}>
      <button
        type="button"
        onClick={() => handlePageClick(-1)}
        disabled={status === STATUS.LOADING}
        className={`inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 sm:text-base sm:w-auto disabled:opacity-80 ${
          page == 1 ? "hidden" : "inline-flex"
        }`}
      >
        Previous
      </button>
      {page === TOTAL_PAGES ? (
        <button
          type="button"
          disabled={status === STATUS.LOADING}
          onClick={handleSubmit}
          className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 sm:text-base sm:w-auto disabled:opacity-80"
        >
          Submit
        </button>
      ) : (
        <button
          type="button"
          onClick={() => handlePageClick(1)}
          disabled={status === STATUS.LOADING}
          className={`inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 sm:text-base sm:w-auto disabled:opacity-80 ${
            page == 1 ? "ml-auto" : "ml-0"
          }`}
        >
          Next
        </button>
      )}
    </div>
  );
});

ButtonGroup.displayName = ButtonGroup;

export default ButtonGroup;
