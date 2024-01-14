import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "../components/Snackbar";
import { signInUser } from "../redux/user/userService";
import { defaultFormData } from "../utils/constants/user";
import { STATUS } from "../utils/constants/common";

const SignIn = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [status, setStatus] = useState(STATUS.IDLE);
  const { error } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setStatus(STATUS.LOADING);
    dispatch(signInUser({ email: formData.email, password: formData.password }))
      .unwrap()
      .then(() => {
        setStatus(STATUS.SUCCEEDED);
        setFormData(defaultFormData);
      })
      .catch(() => {
        setStatus(STATUS.FAILED);
      });
  };

  const handleSnackbar = () => {
    let message =
      status === STATUS.FAILED
        ? error
        : status === STATUS.SUCCEEDED
        ? "User Authenticated Successfully"
        : "";
    let type =
      status === STATUS.FAILED
        ? "error"
        : status === STATUS.SUCCEEDED
        ? "success"
        : "none";
    let open = status === STATUS.FAILED || status === STATUS.SUCCEEDED;
    let onClose = () => {
      status === STATUS.SUCCEEDED
        ? navigate(location?.state?.from || "/")
        : null;
      setStatus(STATUS.IDLE);
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
          disabled={status === STATUS.LOADING}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-slate-800 disabled:opacity-80"
        >
          {status === STATUS.LOADING ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex justify-between mt-5 flex-row">
        <div className="flex gap-2">
          <p>Don&apos;t Have An Account?</p>
          <Link to="/sign-up" className="text-blue-700 hover:text-blue-500">
            Sign UP
          </Link>
        </div>
        <Link
          to="/forgot-password"
          className="text-blue-700 hover:text-blue-500"
        >
          Forgot Password
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
