import { useCallback } from "react";
import { storage } from "../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const useFile = () => {
  const handleFileUpload = useCallback(async (files) => {
    if (!files.length) {
      return {
        success: false,
        message: "Please select atleast one image file.",
      };
    }

    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const imagesRef = ref(storage, new Date().getTime() + file.name);
        uploadBytes(imagesRef, file)
          .then(() => {
            return resolve(getDownloadURL(imagesRef));
          })
          .catch(() => {
            return reject(`error occured while uploding ${file.name} image`);
          });
      });
    });

    // eslint-disable-next-line no-useless-catch
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
  },[]);

  const handleFileDelete = async (urls) => {
    const deletePromise = urls.map((url) => {
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
