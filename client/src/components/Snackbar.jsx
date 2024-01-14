import { useState, useEffect } from 'react';
import { MdOutlineCancel } from "react-icons/md";

function Snackbar({ message, type, open, onClose,time }) {
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    setIsVisible(open);
  }, [open]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      },time || 3000); 

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose,time]);

  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    none:'opacity-0 bg-transparent'
  };

  return (
    <div className={`fixed top-0 right-0 mt-6 mr-4 transform ${isVisible ? 'translate-y-0' : '-translate-y-16'} transition-transform duration-300 ease-in-out`} style={{zIndex:1000}}>
      <div className={`text-white px-4 py-2 rounded ${isVisible?"shadow-md":"shadow-none"} ${typeClasses[type]} text-lg flex justify-between gap-4 align-bottom`}>
        <span>{message}</span>
        <button className=" text-white h-6" onClick={onClose}>
          <MdOutlineCancel className={`${typeClasses[type]} cursor-pointer w-[100%] h-[100%] align-baseline -mb-1`}/>
        </button>
      </div>
    </div>
  );
}

export default Snackbar;
