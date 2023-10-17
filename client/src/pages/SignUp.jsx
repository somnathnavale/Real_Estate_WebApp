import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const defaultFormData={
  username:"",
  email:"",
  password:""
}

const SignUp = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res=await fetch('/api/auth/signup',{
        method:"POST",
        headers:{
          'Content-Type':"application/json",  
        },
        body:JSON.stringify(formData) 
      })
      const data=await res.json();
      if(!data?.success){
        throw new Error(data?.message);
      }
      navigate('/sign-in');
    } catch (error) {
      setError(error.message);
    }finally{
      setLoading(false);
      setFormData(defaultFormData);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading?"Loading...":"Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in" className="text-blue-700">
          Sign in
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
