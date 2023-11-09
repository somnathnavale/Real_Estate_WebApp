import React from 'react'
import background from "../../assets/bg.jpg";
import { useNavigate } from "react-router-dom";

const HomePoster = () => {
    const navigate=useNavigate();

  return (
    <section className="h-[90vh] sm:h-[50vh] lg:h-[60vh] flex justify-center items-center p-3 bg-[rgb(241,245,241)]">
        <div className="flex max-w-md sm:max-w-6xl mx-auto justify-between flex-col sm:flex-row gap-6 sm:gap-0">
          <div className="sm:w-[60%] flex flex-col justify-center gap-3 sm:gap-0 items-center sm:items-start text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold lg:text-4xl sm:mb-6 sm:w-[70%] text-slate-800">
              Ultimate Platform for Your Next Dream{" "}
              <span className="underline underline-offset-3 text-green-500">
                Home
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl md:w-[100%] text-slate-600">
              This is your premier destination for property listings. explore,
              discover, and find your dream property effortlessly with our
              cutting-edge platform.
            </p>
            <div className="mt-5">
              <button
                className="text-white cursor-pointer bg-slate-900 px-3 py-2 rounded-lg hover:opacity-90"
                type="button"
                onClick={() => navigate('/listings')}
              >
                Search Property
              </button>
              <button
                className="text-slate-900 cursor-pointer bg-slate-300 px-3 py-2 rounded-lg hover:opacity-90 ml-4"
                type="button"
                onClick={() => navigate('/listings/add')}
              >
                Add Property
              </button>
            </div>
          </div>
          <div className="sm:h-auto sm:w-[40%] flex items-center">
            <img
              src={background}
              alt="home"
              width="100%"
              className="h-[50vh] sm:h-[100%] md:h-[80%]"
            />
          </div>
        </div>
      </section>
  )
}

export default HomePoster