import React from "react";
import { storage } from "../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const useFile = () => {
  const handleFileUpload = async (files) => {
    if (!files.length) {
      return {
        success: false,
        message: "Please select atleast one image file.",
      };
    }

    const uploadPromises = files.map((file, index) => {
      return new Promise((resolve, reject) => {
        const imagesRef = ref(storage, new Date().getTime() + file.name);
        uploadBytes(imagesRef, file)
          .then((daya) => {
            return resolve(getDownloadURL(imagesRef));
          })
          .catch((error) => {
            return reject(`error occured while uploding ${file.name} image`);
          });
      });
    });

    try {
      const response = await Promise.all(uploadPromises);
      return {
        success: true,
        message: "Successfully Uploaded Images",
        filesUrls: response,
      };
    } catch (error) {
      //   return { success: false, message: error.message };
      throw error;
    }
  };

  const handleFileDelete = async (urls) => {
    const deletePromise = urls.map((url, index) => {
      const delRef = ref(storage, url);
      return deleteObject(delRef);
    });
    try {
      await Promise.all(deletePromise);
    } catch (error) {
      if (error.code !== 404) throw error;
    }
  };

  return {
    handleFileUpload,
    handleFileDelete,
  };
};

export default useFile;
