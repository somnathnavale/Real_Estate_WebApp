import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "../components/Snackbar";
import useAxios from "../hooks/useAxios";
import { axiosPublic } from "../api/axios";
import { updateUser } from "../redux/user/userService";
import { defaultFormData } from "../utils/constants/user";
import { STATUS } from "../utils/constants/common";

const ProfileForm = () => {
  const [status,setStatus]=useState(STATUS.IDLE);
  const { error, user } = useSelector((store) => store.user);
  const [formData, setFormData] = useState({ ...defaultFormData, ...user });
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const axios = useAxios(axiosPublic);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleClick = async () => {
    if (!isEdit) {
      setIsEdit(true);
      return;
    }
    const obj = {
      username: formData?.username,
      email: formData?.email,
      fullname: formData?.fullname,
      mobileNo: formData?.mobileNo,
    };
    setStatus(STATUS.IDLE);
    dispatch(updateUser({ id: user._id, userData: obj, axios })).unwrap().then(()=>{
      setStatus(STATUS.SUCCEEDED);
    }).catch(()=>{
      setStatus(STATUS.FAILED);
    })
  };

  const handleChangePassword= ()=>{
    if(!formData.password){
      return ;
    }
    setStatus(STATUS.IDLE);
    dispatch(updateUser({ id: user._id, userData: {password:formData?.password}, axios })).unwrap().then(()=>{
      setFormData(prev=>({...prev,password:""}))
      setStatus(STATUS.SUCCEEDED);
    }).catch(()=>{
      setStatus(STATUS.FAILED);
    })
  }

  const handleSnackbar = () => {
    let message =
      status === STATUS.FAILED
        ? error
        : status === STATUS.SUCCEEDED
        ? "User Successfully Updated"
        : "";
    let type =
      status === STATUS.FAILED
        ? "error"
        : status === STATUS.SUCCEEDED
        ? "success"
        : "none";
    let open = status === STATUS.FAILED || status === STATUS.SUCCEEDED;
    let onClose = () => {
      setStatus(STATUS.IDLE);
    };
    return {
      message,
      type,
      open,
      onClose,
      time: 1500,
    };
  };

  const returnValue = (val) => {
    if (val) return val;
    return "-not added-";
  };

  return (
    <div className="p-8 border max-w-3xl mx-auto">
      <Snackbar {...handleSnackbar()} />
      <div className="max-w-md mx-auto">
        <h1 className="text-xl font-medium">Profile Details</h1>
        <hr className="my-4" />
        {isEdit ? (
          <form className="grid grid-cols-6 gap-2 gap-y-4 p-4 text-base">
            <label
              className="col-span-2 flex text-slate-700 font-light items-center"
              htmlFor="username"
            >
              Username *
            </label>
            <input
              type="text"
              placeholder="username"
              className="border px-4 py-2 outline-[#e2e2e2] col-span-4"
              id="username"
              value={formData?.username}
              onChange={handleChange}
              autoComplete="off"
            />
            <label
              className="col-span-2 flex text-slate-700 font-light items-center"
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              type="text"
              placeholder="fullname"
              className="border px-4 py-2 outline-[#e2e2e2] col-span-4"
              id="fullname"
              value={formData?.fullname}
              onChange={handleChange}
              autoComplete="off"
            />
            <label
              className="col-span-2 flex text-slate-700 font-light items-center"
              htmlFor="email"
            >
              Email *
            </label>
            <input
              type="text"
              placeholder="email"
              className="border px-4 py-2 outline-[#e2e2e2] col-span-4"
              id="email"
              value={formData?.email}
              onChange={handleChange}
              autoComplete="off"
            />
            <label
              className="col-span-2 flex text-slate-700 font-light items-center"
              htmlFor="mobileNo"
            >
              Mobile No.
            </label>
            <input
              type="number"
              placeholder="mobile no."
              className="border px-4 py-2 outline-[#e2e2e2] col-span-4"
              id="mobileNo"
              value={formData?.mobileNo}
              onChange={handleChange}
              autoComplete="off"
            />
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-2 gap-y-4 p-4 text-base">
            <div className="text-slate-700 font-light">Full Name</div>
            <div>{returnValue(user?.fullname)}</div>
            <div className="text-slate-700 font-light">Username</div>
            <div>{returnValue(user?.username)}</div>
            <div className="text-slate-700 font-light">Email</div>
            <div>{returnValue(user?.email)}</div>
            <div className="text-slate-700 font-light">Mobile No.</div>
            <div>{returnValue(user?.mobileNo)}</div>
          </div>
        )}
        <button
          disabled={status === STATUS.LOADING}
          className="w-full mt-4 bg-slate-700 hover:bg-opacity-95 text-white rounded py-1 text-lg disabled:opacity-80"
          onClick={handleClick}
        >
          {isEdit ? "Save" : "Edit"}
        </button>
        <hr className="my-6" />
        <div className="flex justify-between">
          <input
            type="password"
            placeholder="new password"
            className="border px-4 py-1 outline-[#e2e2e2]"
            id="password"
            value={formData?.password}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <button
            type="submit"
            disabled={status === STATUS.LOADING}
            onClick={handleChangePassword}
            className=" bg-slate-700 hover:bg-opacity-95 text-white rounded px-4 py-2 disabled:opacity-80"
          >Change Password</button>
        </div>
      </div>

    </div>
  );
};

export default ProfileForm;
