import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { signInFailure,signInSuccess,signInStart } from "../redux/user/userSlice";
const defaultFormData={
  email:"",
  password:""
}

const SignIn = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const {error,loading}=useSelector(store=>store.user);
  const dispatch=useDispatch();

  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res=await fetch('/api/auth/signin',{
        method:"POST",
        headers:{
          'Content-Type':"application/json",  
        },
        body:JSON.stringify(formData) 
      })
      const data=await res.json();
      if(!data?.user){
        throw new Error(data?.message);
      }
      dispatch(signInSuccess(data.user));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }finally{
      setFormData(defaultFormData);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading?"Loading...":"Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't Have An Account?</p>
        <Link to="/sign-up" className="text-blue-700">
          Sign UP 
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignIn;
