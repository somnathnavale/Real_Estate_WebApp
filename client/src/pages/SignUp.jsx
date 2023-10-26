import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, updateStatus } from "../redux/user/userSlice";
import Snackbar from "../components/Snackbar";

const defaultFormData = {
  username: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const { status, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUpUser(formData));
    setFormData(defaultFormData);
  };

  const handleSnackbar = () => {
    let message =
      status === "failed"
        ? error
        : status === "succeeded"
        ? "User Created Successfully"
        : "";
    let type =
      status === "failed"
        ? "error"
        : status === "succeeded"
        ? "success"
        : "none";
    let open = status === "failed" || status === "succeeded";
    let onClose = () => {
      status === "succeeded" ? navigate("/sign-in") : null;
      dispatch(updateStatus("idle"));
    };
    return {
      message,
      type,
      open,
      onClose,
      time: 3000,
    };
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <Snackbar {...handleSnackbar()} />
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          autoComplete="off"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          autoComplete="off"
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {status === "loading" ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in" className="text-blue-700">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
