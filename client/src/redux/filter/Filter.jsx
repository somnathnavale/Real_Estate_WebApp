import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCheckbox,
  togglePriceCheckbox,
  clearFilters,
  setFilter,
} from "./filterSlice";
import { FaFilter, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { amenities } from "../../utils/constants/filter";
import { getListings } from "../listings/listingService";

const Filter = () => {
  const dispatch = useDispatch();
  const searchFilter = useSelector((store) => store.filter);
  const { enumConst } = useSelector((store) => store.enum);
  const [showFilter, setShowFilter] = useState(false);

  const handleCheckboxChange = (field, value) => {
    dispatch(toggleCheckbox({ field, value }));
  };

  const handlePriceChange = (id) => {
    dispatch(togglePriceCheckbox(id));
  };

  const handleSearch = () => {
    dispatch(getListings());
  };

  return (
    <div className="w-full md:w-auto relative md:block z-10 sm:z-0">
      <div className="w-full flex justify-between md:hidden">
        <div className="grow mr-2">
          <form
            className="bg-slate-100 p-2 text-lg rounded-lg flex items-center justify-between w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <input
              type="text"
              placeholder="search by cities, description..."
              className="bg-transparent focus:outline-none cursor-pointer w-full"
              name="searchText"
              value={searchFilter.searchText}
              autoComplete="off"
              onChange={(e) =>
                dispatch(setFilter({ searchText: e.target.value }))
              }
            />
            <button type="submit">
              <FaSearch className="text-lg text-slate-700 cursor-pointer" />
            </button>
          </form>
        </div>
        <FaFilter
          className="w-12 h-12 bg-slate-100 text-slate-700 p-2 rounded cursor-pointer hover:text-slate-600"
          onClick={() => setShowFilter((prev) => !prev)}
        />
      </div>
      <div
        className={`absolute bg-white border rounded-md p-4 min-w-[240px] ${
          showFilter ? "top-16 right-0" : "left-[-1000%]"
        } md:block md:static`}
      >
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">All Filters</h3>
          <IoClose
            className="text-lg font-medium w-8 h-8 bottom-0 rounded-2xl cursor-pointer hover:bg-slate-100 active:p-[2px] md:hidden"
            onClick={() => setShowFilter(false)}
          />
        </div>
        <div className="my-2 border-b-2 border-slate-300" />
        <div className="max-h-[60vh] overflow-y-auto">
          <div>
            <h3 className="font-medium">Category</h3>
            <div>
              {Object.values(enumConst?.category || []).map((category) => (
                <label key={category} className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    name="category"
                    checked={searchFilter.category.includes(category)}
                    onChange={() => handleCheckboxChange("category", category)}
                    className="mr-2 h-4 w-4"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
          <div className="border-b-2 border-slate-300 my-2" />
          <div>
            <h3 className="font-medium">Listing Type</h3>
            <div>
              {Object.values(enumConst?.listingType || []).map(
                (listingType) => (
                  <label key={listingType} className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      name="listingType"
                      checked={searchFilter.listingType.includes(listingType)}
                      onChange={() =>
                        handleCheckboxChange("listingType", listingType)
                      }
                      className="mr-2 h-4 w-4"
                    />
                    {listingType}
                  </label>
                )
              )}
            </div>
          </div>
          <div className="border-b-2 border-slate-300 my-2" />
          <div>
            <h3 className="font-medium">Furnishing</h3>
            <div>
              {Object.values(enumConst?.furnishing || []).map((item) => (
                <label key={item} className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    name="Furnishing"
                    checked={searchFilter.furnishing.includes(item)}
                    onChange={() => handleCheckboxChange("furnishing", item)}
                    className="mr-2 h-4 w-4"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
          <div className="border-b-2 border-slate-300 my-2" />
          <div>
            <h3 className="font-medium">Property Price</h3>
            <div>
              {searchFilter.price?.map((range, id) => (
                <label
                  key={range.label}
                  className="flex items-center mt-1"
                  htmlFor={range.label}
                >
                  <input
                    id={range.label}
                    type="checkbox"
                    name="price"
                    checked={range.checked}
                    onChange={() => handlePriceChange(id)}
                    className="mr-2 h-4 w-4"
                  />
                  {range.label}
                </label>
              ))}
            </div>
          </div>
          <div className="border-b-2 border-slate-300 my-2" />
          <div>
            <h3 className="font-medium">Amenities</h3>
            <div>
              {amenities.map((amenity) => (
                <label key={amenity} className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    name="amenity"
                    checked={searchFilter.amenities.includes(amenity)}
                    onChange={() => handleCheckboxChange("amenities", amenity)}
                    className="mr-2 h-4 w-4"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="border-b-2 border-slate-300 my-2" />
        <div className="grid grid-cols-2 mt-2 gap-4">
          <button
            className=" rounded-md border border-transparent shadow-sm px-2 py-1 bg-slate-700 text-base font-medium text-white hover:bg-slate-800 focus:outline-none"
            onClick={() => {
              dispatch(clearFilters());
              handleSearch();
            }}
          >
            Clear
          </button>
          <button
            className="rounded-md border border-transparent shadow-sm px-2 py-1 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none"
            onClick={handleSearch}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
