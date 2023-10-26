import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInUser, updateStatus } from "../redux/user/userSlice";
import Snackbar from "../components/Snackbar";

const defaultFormData = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const { error, status } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signInUser(formData));
    if (status === "succeeded") {
      setFormData(defaultFormData);
    }
  };

  const handleSnackbar = () => {
    let message =
      status === "failed"
        ? error
        : status === "succeeded"
        ? "User Successfully Authenticated"
        : "";
    let type =
      status === "failed"
        ? "error"
        : status === "succeeded"
        ? "success"
        : "none";
    let open = status === "failed" || status === "succeeded";
    let onClose = () => {
      status === "succeeded" ? navigate("/") : null;
      dispatch(updateStatus("idle", { extra: { name: "somnath" } }));
    };
    return {
      message,
      type,
      open,
      onClose,
      time: 1000,
    };
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <Snackbar {...handleSnackbar()} />
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
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
          {status === "loading" ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't Have An Account?</p>
        <Link to="/sign-up" className="text-blue-700">
          Sign UP
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
