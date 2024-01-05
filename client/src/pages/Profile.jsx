import { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import { allOptions } from "../utils/constants/user";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, logout } from "../redux/user/userService";
import useAxios from "../hooks/useAxios";
import { axiosPublic } from "../api/axios";
import MyListings from "../redux/listings/MyListings";
import { STATUS } from "../utils/constants/common";
import ConfirmationModal from "../components/ConfirmationModal";
import { getMyListing } from "../redux/listings/listingService";
import useFile from "../hooks/useFile";

const renderer = (option) => {
  switch (option) {
    case "profile":
      return <ProfileForm />;
    case "mylistings":
      return <MyListings />;
    default:
      return <></>;
  }
};

const optionRenderer = (label, value, option, setOption) => {
  return (
    <li
      key={label}
      className={`block p-1 sm:p-2 cursor-pointer ${
        option === value ? "bg-slate-700 text-white" : "hover:text-slate-500"
      } rounded`}
      onClick={() => setOption(value)}
    >
      {label}
    </li>
  );
};

const Profile = () => {
  const [option, setOption] = useState("profile");
  const [open, setOpen] = useState(false);
  const { status, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const axios = useAxios(axiosPublic);
  const {handleFileDelete}=useFile();
  useEffect(() => {
    if (status === STATUS.LOADING) return;
    else if (option === "logout") {
      setOpen(true);
    } else if (option === "delete") {
      setOpen(true);
    }
  }, [option, status, user]);

  const handleLogout = () => {
    setOpen(false);
    dispatch(logout());
  };

  const handleDelete = async () => {
    try {
      const filter = { userId: user._id, limit:1000 };
      const allListings=await dispatch(getMyListing(filter)).unwrap();
      await dispatch(deleteUser({ id: user._id, axios })).unwrap();
      const urls=[];
      allListings?.listings.forEach((listing)=>{
        urls.push(...listing.photos)
      });
      await handleFileDelete(urls);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <ConfirmationModal
        header={option == "delete" ? "Delete Account" : "Logout"}
        body={`Are you sure you want to ${
          option == "delete" ? "delete" : "logout from"
        } your account?`}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={option == "delete" ? handleDelete : handleLogout}
        submitBtnText={`Yes, ${option == "delete" ? "Delete" : "Logout"}`}
        warningMsg={
          option == "delete"
            ? "By Deleting this Account, you won't be able access it again."
            : "By Logging out, you will be logged out of website."
        }
      />
      <div className="max-w-screen-xl mx-auto grid grid-cols-10 p-2 min-[400px]:p-4 gap-4 my-2">
        <div className="order-last col-span-full md:col-span-8">
          {renderer(option)}
        </div>
        <ul className=" flex md:flex-col font-semibold text-slate-700 col-span-full md:col-span-2 md:order-last">
          {allOptions.map((opt) => {
            return optionRenderer(opt.label, opt.value, option, setOption);
          })}
        </ul>
      </div>
    </>
  );
};

export default Profile;
