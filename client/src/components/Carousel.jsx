import React, { useState } from 'react';
import { GrPrevious,GrNext } from "react-icons/gr";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROKQ6J37tNhd02-H-EQ1kG0buMCyjySnkAuRG5DL_JM__yst5BLmHjr8zPeC-rqvrvaMg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQcdqHy6VlcVNnjtcCIEFkmLXlgC3QbU2gA&usqp=CAU',
    'https://placekitten.com/602/600',
    'https://placekitten.com/603/300',
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative overflow-hidden h-full max-h-[40vh] bg-[#f3f3f3] bg-opacity-40 border border-slate-300">
      <div className="flex transition-transform ease-in-out duration-300 transform translate-x-full h-full" style={{ width: `${images.length * 100}%`, transform: `translateX(-${(currentIndex / images.length) * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="h-full w-full flex items-center justify-center bg-slate-50 bg-opacity-20">
            <img className="h-full" src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-12 text-slate-500 hover:bg-slate-200 hover:bg-opacity-20 ">
        <GrPrevious className='w-full h-full p-1'/>
      </button>

      <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-12  hover:bg-slate-200 hover:bg-opacity-20 ">
        <GrNext className='w-full h-full p-1'/>
      </button>
      <p className='z-10 text-white font-serif bg-black bg-opacity-20 p-2 absolute top-0 left-0'>Images</p>
    </div>
  );
};

export default Carousel