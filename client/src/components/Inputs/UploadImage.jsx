import React, { useRef, useState } from "react";
import { MdCancel, MdDelete } from "react-icons/md";
import {ref, uploadBytes,getDownloadURL, deleteObject } from "firebase/storage"
import {storage} from "../../firebase";
import resizeFile from "../../utils/helpers/compressFile";

const defaultError={success:false,message:""}

const UploadImage = ({propertyData,setPropertyData}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState(defaultError);
  const [loading,setLoading]=useState(false);

  const fileRef = useRef();

  const handleFileChange =async(event) => {
    setError(defaultError);
    const files = event.target.files;
    if (files.length > 5) {
      setError({success:false,message:"Maximum 5 files are allowed"});
      return;
    }
    const invalidFiles = Array.from(files).filter(
      (file) => !file.type.startsWith("image/")
    );
    if (invalidFiles.length) {
      setError({success:false,message:"Please select a valid image file."});
      return;
    }
    try {
        const compressedFiles=await Promise.all(resizeFile(Array.from(files)));
        setSelectedFiles(compressedFiles);
    } catch (error) {
        setError({success:false,message:error?.message});
    }
  };

  const handleFileUpload = async () => {
    setError(defaultError);
    if (!selectedFiles.length) {
      setError({success:false,message:"Please select atleast one image file."});
      return;
    }
    const uploadPromises = selectedFiles.map(
      async (file, index) => {
        const imagesRef = ref(storage, new Date().getTime()+file.name);
        try {
            await uploadBytes(imagesRef, file)
            const downloadUrl=await getDownloadURL(imagesRef)
            setPropertyData(prev=>({...prev,photos:[...prev.photos,downloadUrl]}))
        } catch (error) {
            throw new Error(`error occured while uploding ${file.name} image`);
        }
      }
    );

    try {
        setLoading(true);
        await Promise.all(uploadPromises);
        setSelectedFiles([]);
        setError({success:true,message:"Successfully Uploaded Images"});
    } catch (error) {
        setError({success:false,message:error.message});
    }finally{
        setLoading(false);
    }
  };

  const handleDeleteImage=async(url)=>{
    if(loading)
      return;
    setLoading(true);
    setError(defaultError)
    try {
        const delRef = ref(storage, url);
        await deleteObject(delRef);
        setError({success:true,message:"Successfully Deleted Image"});
        setPropertyData(prev=>({...prev,photos:prev.photos.filter(prevUrl=>prevUrl!==url)}))
    } catch (error) {
        console.log(error)
        setError({success:false,message:error.message});
    }finally{
        setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-4">
      {error.message.length ? (
        <div className={`col-span-full ${error.success ? "text-green-600":"text-red-700"} flex items-center gap-4`}>
            <p className="text-lg mb-1 ">{error.message}</p>
            <MdCancel className="w-6 h-6  cursor-pointer text-opacity-80 hover:text-opacity-50" onClick={()=>setError(defaultError)}/>
        </div>
      ) : (
        <></>
      )}
      <div className="col-span-full sm:col-span-2">
        <p className="text-lg font-medium text-slate-700">Upload Image </p>
        <p className="text-gray-400 text-sm">
          Only jpg, png, jpeg images allowed, maximum 5 images per Listing
        </p>
        <div className="flex max-w-xs justify-between mt-4">
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileRef}
            className=" hidden"
            onChange={handleFileChange}
          />
          <div
            className="px-4 py-1 border-gray-700 text-gray-700 font-medium border-2 text-lg rounded-md cursor-pointer"
            onClick={() => fileRef.current.click()}
          >
            Choose File
          </div>
          <button
            type="button"
            className="border-2 font-medium px-4 py-1 rounded-md text-lg border-green-500 text-green-500 hover:text-opacity-80 hover:border-opacity-80 disabled:text-opacity-50"
            disabled={loading}
            onClick={handleFileUpload}
          >
            {"Upload"}
          </button>
        </div>
        <p className="mt-1 text-gray-600 text-sm">
          {selectedFiles.length ? `${selectedFiles.length} files Selected` : ""}
        </p>
      </div>
      <div className="col-span-full sm:col-span-2">
        <p className="text-lg font-medium text-slate-700">Uploaded Images</p>
        <div className="overflow-x-auto max-h-24">
          {propertyData.photos.map((url, idx) => (
            <li  key={url} className="flex justify-between px-2  pb-1 border-b-2 border-gray-300 items-center">
              <a
                href={url}
                target="_blank"
                className="text-blue-800 hover:text-blue-500 underline underline-offset-2"
              >
                {" "}
                {url.slice(0, 60)}...
              </a>
              <MdDelete className="w-6 h-8 pt-1 cursor-pointer hover:text-red-600" onClick={()=>handleDeleteImage(url)}/>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
