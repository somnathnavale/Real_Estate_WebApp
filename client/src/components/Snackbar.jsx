import React, { useState, useEffect } from 'react';

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
  }, [isVisible, onClose]);

  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
  };

  return (
    <div className={`fixed top-0 right-0 mt-6 mr-4 transform ${isVisible ? 'translate-y-0' : '-translate-y-16'} transition-transform duration-300 ease-in-out`} style={{zIndex:1000}}>
      <div className={`text-white px-4 py-2 rounded shadow-md ${typeClasses[type]}`}>
        {message}
        <button className="ml-2 text-white" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default Snackbar;
