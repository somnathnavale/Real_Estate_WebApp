import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "../components/Snackbar";
import { updateStatus } from "../redux/user/userSlice";
import useAxios from "../hooks/useAxios";
import { axiosPublic } from "../api/axios";
import { deleteUser, logout, updateUser } from "../redux/user/userService";

const defaultFormData = {
  username: "",
  email: "",
  password: "",
};

const Profile = () => {
  const { status, error, user } = useSelector((store) => store.user);
  const [formData, setFormData] = useState({ ...defaultFormData, ...user });

  const dispatch = useDispatch();
  const axios = useAxios(axiosPublic);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const obj = {
      username: formData?.username,
      email: formData?.email,
    };
    if (formData?.password) {
      obj.password = formData?.password;
    }
    await dispatch(updateUser({id:user._id, userData: obj, axios })).unwrap();
  };

  const handleDelete = async() => {
      try {
        await dispatch(deleteUser({id:user._id,axios})).unwrap();
      } catch (error) {
        console.log(error);
      }
  };

  const handleLogout=async()=>{
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  const handleSnackbar = () => {
    let message =
      status === "failed"
        ? error
        : status === "succeeded"
        ? "User Successfully Updated"
        : "";
    let type =
      status === "failed"
        ? "error"
        : status === "succeeded"
        ? "success"
        : "none";
    let open = status === "failed" || status === "succeeded";
    let onClose = () => {
      dispatch(updateStatus("idle"));
    };
    return {
      message,
      type,
      open,
      onClose,
      time: 1500,
    };
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <Snackbar {...handleSnackbar()} />
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <img
          src={user?.avatar}
          alt='="profile'
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        />
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          value={formData?.username}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          value={formData?.email}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          value={formData?.password}
          onChange={handleChange}
          autoComplete="off"
        />
        <button
          disabled={status === "loading"}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {status === "loading" ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <button disabled={status === "loading"} className="text-slate-700 cursor-pointer bg-slate-300 p-2 rounded-lg hover:opacity-90 disabled:opacity-80" type="button" onClick={handleDelete}>
          Delete Account
        </button>
        <button disabled={status === "loading"} className="text-slate-700 cursor-pointer bg-slate-300 p-2 rounded-lg hover:opacity-90 disabled:opacity-80" type="button" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Profile;
