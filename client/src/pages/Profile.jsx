import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { updateUserFailure,updateUserStart,updateUserSuccess } from "../redux/user/userSlice.js";

const defaultFormData = {
  username: "",
  email: "",
  password: "",
};

const Profile = () => {
  const fileRef = useRef(null);
  const { loading,error,currUser } = useSelector((store) => store.user);

  const [file, setFile] = useState(undefined);
  const [fileUploadedPercentage, setFileUploadedPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState({...defaultFormData,...currUser});
  const [status,setStatus]=useState(false);
  const dispatch=useDispatch();

  useEffect(() => {
    const handleFileUpload = async () => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileUploadedPercentage(Math.round(progress));
        },
        (error) => {
          setFileUploadError(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL });
          });
        }
      );
    };
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setStatus(false);
    try {
      dispatch(updateUserStart());
      const response=await fetch(`/api/user/update/${currUser._id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(formData)
      })
      const data=await response.json();
      if(!data?.user){
        throw new Error(data?.message);
      }
      dispatch(updateUserSuccess(data.user));
      setStatus(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }
  
  const handleDelete=async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const response=await fetch(`/api/user/delete/${currUser._id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
        }
      })
      const data=await response.json();
      if(!data?.user){
        throw new Error(data?.message);
      }
      dispatch(updateUserSuccess(data.user));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name=""
          id=""
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={(e) => fileRef.current.click()}
          src={formData?.avatar || currUser?.avatar}
          alt='="profile'
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        />
        <p className="text-center">
          {fileUploadError ? (
            <span className="text-red-700">Error Upload Image</span>
          ) : fileUploadedPercentage > 0 && fileUploadedPercentage < 100 ? (
            <span className="text-slate-500">{`Uploading ${fileUploadedPercentage}%`}</span>
          ) : fileUploadedPercentage === 100 ? (
            <span className="text-green-500">Image Uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          defaultValue={currUser?.username}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          defaultValue={currUser?.email}
          onChange={handleChange}
          autoComplete="off"

        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          autoComplete="off"
        />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading?"Loading...":"Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      {status && <p className="text-green-600 mt-5">User updated Successfully</p>}
    </div>
  );
};

export default Profile;
