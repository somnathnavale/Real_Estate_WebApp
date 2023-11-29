import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "../components/Snackbar";
import { signUpUser } from "../redux/user/userService";
import { defaultFormData } from "../utils/constants/user";
import { STATUS } from "../utils/constants/common";

const SignUp = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [status,setStatus]=useState(STATUS.IDLE);
  const { error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUpUser(formData)).unwrap().then((e)=>{
      setStatus(STATUS.SUCCEEDED);
      setFormData(defaultFormData);
    }).catch(()=>{
      setStatus(STATUS.SUCCEEDED);
    })
  };

  const handleSnackbar = () => {
    let message =
      status === STATUS.FAILED
        ? error
        : status === STATUS.SUCCEEDED
        ? "User Created Successfully"
        : "";
    let type =
      status === STATUS.FAILED
        ? "error"
        : status === STATUS.SUCCEEDED
        ? "success"
        : "none";
    let open = status === STATUS.FAILED || status === STATUS.SUCCEEDED;
    let onClose = () => {
      status === STATUS.SUCCEEDED ? navigate("/sign-in") : null;
      setStatus(STATUS.IDLE);
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
      <h1 className="text-3xl text-center font-semibold mt-6 mb-4">Sign Up</h1>
      <form className="grid grid-cols-8 gap-2 gap-y-4 p-4 text-base" onSubmit={handleSignUp}>
        <label
          className="col-span-2 flex text-slate-700 font-light items-center"
          htmlFor="username"
        >
          Username *
        </label>
        <input
          type="text"
          placeholder="username"
          className="border px-4 py-2 outline-[#e2e2e2] col-span-6"
          id="username"
          value={formData?.username}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <label
          className="col-span-2 flex text-slate-700 font-light items-center"
          htmlFor="password"
        >
          Password *
        </label>
        <input
          type="password"
          placeholder="password"
          className="border px-4 py-2 outline-[#e2e2e2] col-span-6"
          id="password"
          value={formData?.password}
          onChange={handleChange}
          autoComplete="off"
          required
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
          className="border px-4 py-2 outline-[#e2e2e2] col-span-6"
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
          className="border px-4 py-2 outline-[#e2e2e2] col-span-6"
          id="email"
          value={formData?.email}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <label
          className="col-span-2 flex text-slate-700 font-light items-center"
          htmlFor="mobileNo"
        >
          Mobile No. *
        </label>
        <input
          type="number"
          placeholder="mobile no."
          className="border px-4 py-2 outline-[#e2e2e2] col-span-6"
          id="mobileNo"
          value={formData?.mobileNo}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <button
          type="submit"
          disabled={status === STATUS.LOADING}
          className="col-span-full bg-slate-700 text-white p-2 mt-4 rounded uppercase hover:opacity-95 disabled:opacity-80"
        >
          {status === STATUS.LOADING ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2">
        <p>Have an account?</p>
        <Link to="/sign-in" className="text-blue-700">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
