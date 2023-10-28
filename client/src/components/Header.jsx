import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSelector((state) => state.user);
  const location=useLocation();

  useEffect(()=>{
    setOpenMenu(false);
  },[location])

  return (
    <header className="bg-slate-200 shadow-lg sticky top-0" style={{zIndex:100}}>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="NextGen Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              NextGen
            </span>
          </div>
          <div>
            <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-600" />
          </form>
          </div>
          <div
            className="md:hidden w-8 h-8 cursor-pointer text-slate-900 hover:opacity-90"
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            <IoMenu
              className={`w-[100%] h-[100%] ${
                openMenu ? "hidden" : "inline-block"
              }`}
            />
            <IoClose
              className={`w-[100%] h-[100%] ${
                openMenu ? "inline-block" : "hidden"
              }`}
            />
          </div>
          <div
            className={`justify-between items-center w-full md:flex md:w-auto md:order-1 ${
              !openMenu ? "hidden" : "inline-block"
            }`}
          >
            <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 dark:text-white hover:underline underline-offset-4"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/add-properties"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:underline underline-offset-4 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Add Listings
                </Link>
              </li>
              <li>
                {user?.username ? (
                  <Link
                    to="/profile"
                    className=" outline-none block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:underline underline-offset-4 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Profile
                  </Link>
                ) : (
                  <Link
                    to="/sign-in"
                    className="outline-none block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:underline underline-offset-4 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Sign In
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
