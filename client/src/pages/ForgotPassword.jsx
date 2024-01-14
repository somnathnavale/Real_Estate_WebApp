import  { useState } from "react";
import Snackbar from "../components/Snackbar";
import { Link } from "react-router-dom";
import { axiosPublic } from "../api/axios";
import Loader from "../components/Loader";
import { ErrorHandler } from "../utils/helpers/asyncHandlers";

const defaultError = {
  message: "",
  type: "",
};

const defaultInput = {
  email: "",
  otp: "",
  password: "",
  confirmPassword: "",
};

const STEPS = {
  SENDOTP: "SENDOTP",
  VERIFYOTP: "VERIFYOTP",
  UPDATEPASSWORD: "UPDATEPASSWORD",
};


const Input = ({ input, setInput, type, placeholder, id, field }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="border px-4 py-2 outline-[#e2e2e2] rounded-lg mt-2"
      id={id}
      value={input[field]}
      onChange={(e) =>
        setInput((prev) => ({ ...prev, [field]: e.target.value }))
      }
      autoComplete="off"
      required={true}
    />
  );
};

const ForgotPassword = () => {
  const [input, setInput] = useState(defaultInput);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(defaultError);
  const [step, setStep] = useState(STEPS.SENDOTP);

  const forgotPasswordRequest = async (data, nextStep) => {
    try {
      const response = await axiosPublic.post(
        `/api/auth/forgot-password?step=${step}`,
        data
      );
      setError({
        message: response?.data?.message,
        type: "success",
      });
      setStep(nextStep);
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(defaultError);
    setLoading(true);
    try {
      if (step === STEPS.SENDOTP) {
        await forgotPasswordRequest({ email: input.email }, STEPS.VERIFYOTP);
      } else if (step === STEPS.VERIFYOTP) {
        await forgotPasswordRequest({ otp: input.otp }, STEPS.UPDATEPASSWORD);
      } else if (step === STEPS.UPDATEPASSWORD) {
        if (input.password !== input.confirmPassword) {
          setError({
            message: "Both Password Should be Same",
            type: "error",
          });
          setInput((prev) => ({ ...prev, password: "", confirmPassword: "" }));
          return;
        }
        await forgotPasswordRequest(
          { password: input.password },
          STEPS.SENDOTP
        );
      }
    } catch (error) {
      const { message } = ErrorHandler(error);
      setError({
        message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setInput((prev) => ({ ...defaultInput, email: prev.email }));
    setStep(STEPS.SENDOTP);
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <Snackbar
        message={error.message}
        type={error.type}
        open={error.message.length}
        onClose={() => {
          setError(defaultError);
        }}
        time={error.message.length ? 5000 : 1500}
      />
      {loading && <Loader />}
      <h3 className="text-xl text-center font-medium mb-2">Forgot Password</h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {step === STEPS.SENDOTP ? (
          <Input
            input={input}
            setInput={setInput}
            type="email"
            placeholder="email address"
            field="email"
            id="email"
          />
        ) : step === STEPS.VERIFYOTP ? (
          <Input
            input={input}
            setInput={setInput}
            type="number"
            placeholder="enter a OTP"
            field="otp"
            id="otp"
          />
        ) : (
          <>
            <Input
              input={input}
              setInput={setInput}
              type="password"
              placeholder="password"
              field="password"
              id="password"
            />
            <Input
              input={input}
              setInput={setInput}
              type="password"
              placeholder="confirm password"
              field="confirmPassword"
              id="confirmPassword"
            />
          </>
        )}
        <button
          type="submit"
          disabled={loading}
          className=" bg-slate-700 text-base font-medium text-white hover:bg-slate-800 rounded-lg px-4 py-2 disabled:opacity-80 mx-auto"
        >
          {step === STEPS.SENDOTP
            ? "Get OTP"
            : step === STEPS.VERIFYOTP
            ? "Verify OTP"
            : "Update Password"}
        </button>
      </form>
      <div>
        {step !== STEPS.SENDOTP && (
          <button
            className="border-none outline-none text-red-500"
            onClick={goBack}
          >
            Go back
          </button>
        )}
      </div>
      <div className="flex gap-2 mt-5">
        <p>Have An Account?</p>
        <Link to="/sign-in" className="text-blue-700 hover:text-blue-500">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;

