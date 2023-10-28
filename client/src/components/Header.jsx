import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-lg sticky top-0" style={{zIndex:100}}>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-base sm:text-2xl flex flex-wrap">
          <span className="text-slate-500">NextGen</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/add-property">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Add Property
            </li>
          </Link>
          {user?.username ? (
            <Link to="/profile">
              <img
                src={user?.avatar}
                alt="profile"
                className="rounded-full w-7 h-7 object-cover"
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="text-slate-700 hover:underline">Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
