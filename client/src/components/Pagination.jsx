import  { useEffect, useState } from "react";

const Pagination = ({count,limit,page,handleChange}) => {
  const [limits,setLimits]=useState([]);
  const pages = Math.ceil(count / limit);

  useEffect(()=>{
    const generatePageNumbers = () => {
      const pageNumbers = [];
      const numPagesToShow = 5;
  
      if (pages <= numPagesToShow) {
        for (let i = 1; i <= pages; i++) {
          pageNumbers.push(i);
        }
      } else {
        let startPage = Math.max(1, page - 2);
        let endPage = Math.min(pages, page + 2);
        if (endPage - startPage + 1 < numPagesToShow) {
          if (page < pages / 2) {
            endPage = startPage + numPagesToShow - 1;
          } else {
            startPage = endPage - numPagesToShow + 1;
          }
        }
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
      }
      setLimits(pageNumbers);
    };
  
    generatePageNumbers();
  },[page,pages])

  return (
    <div className="mt-4 flex justify-center text-lg">
      <span
        onClick={() => handleChange(page-1)}
        className={`${
          page == 1 ? "hidden" : "inline"
        } px-4 py-2 bg-white cursor-pointer hover:bg-slate-200 border border-gray-300`}
      >
        Prev
      </span>
      {limits.map((id) => (
        <span
          key={id}
          onClick={() => handleChange(id)}
          className={`${
            id  === page ? "bg-slate-700 text-white" : "bg-white"
          } px-4 py-2 cursor-pointer hover:bg-slate-${
            id === page ? "700" : "200"
          } border border-gray-300`}
        >
          {id }
        </span>
      ))}
      <span
        onClick={() => handleChange(page+1)}
        className={`${
          page == pages ? "hidden" : "inline"
        } px-4 py-2 bg-white cursor-pointer hover:bg-slate-200 border border-gray-300`}
      >
        Next
      </span>
    </div>
  );
};

export default Pagination;
