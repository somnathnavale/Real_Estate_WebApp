import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

const defaultFormData = {
  username: "",
  email: "",
  password: "",
};

const Profile = () => {
  const fileRef = useRef(null);
  const { currUser } = useSelector((store) => store.user);

  const [file, setFile] = useState(undefined);
  const [fileUploadedPercentage, setFileUploadedPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState(defaultFormData);

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
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
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
