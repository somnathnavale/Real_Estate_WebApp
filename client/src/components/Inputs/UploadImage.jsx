import { memo, useRef, useState } from "react";
import { MdCancel, MdDelete } from "react-icons/md";
import resizeFile from "../../utils/helpers/compressFile";
import useFile from "../../hooks/useFile";
import { STATUS } from "../../utils/constants/common";
const defaultError = { success: false, message: "" };

const UploadImage = memo(
  ({
    propertyData,
    setPropertyData,
    selectedFiles,
    setSelectedFiles,
    status,
    setStatus,
  }) => {
    const [error, setError] = useState(defaultError);

    const fileRef = useRef();
    const { handleFileDelete } = useFile();

    const handleFileChange = async (event) => {
      setError(defaultError);
      setSelectedFiles([]);
      const files = event.target.files;
      if (files.length > 5) {
        setError({ success: false, message: "Maximum 5 files are allowed" });
        return;
      }
      const invalidFiles = Array.from(files).filter(
        (file) => !file.type.startsWith("image/")
      );
      if (invalidFiles.length) {
        setError({
          success: false,
          message: "Please select a valid image file.",
        });
        return;
      }
      try {
        const compressedFiles = await Promise.all(
          resizeFile(Array.from(files))
        );
        setSelectedFiles(compressedFiles);
      } catch (error) {
        setError({ success: false, message: error?.message });
      }
    };

    const handleSelectedDeleteImage = (name) => {
      const updatedFiles = selectedFiles.filter((file) => file.name !== name);
      setSelectedFiles(updatedFiles);
    };

    const handleDeleteImage = async (url) => {
      if (status === STATUS.LOADING) return;
      setError(defaultError);
      setStatus(STATUS.LOADING);
      try {
        await handleFileDelete([url]);
        const updatedFiles = propertyData.photos.filter(
          (photo) => photo !== url
        );
        setPropertyData((prev) => ({ ...prev, photos: updatedFiles }));
      } catch (error) {
        setError({ success: false, message: error?.message });
      } finally {
        setStatus(STATUS.IDLE);
      }
    };

    return (
      <div className="grid grid-cols-6 gap-y-4">
        {error.message.length ? (
          <div
            className={`col-span-full ${
              error.success ? "text-green-600" : "text-red-700"
            } flex items-center gap-4`}
          >
            <p className="text-lg mb-1 ">{error.message}</p>
            <MdCancel
              className="w-6 h-6  cursor-pointer text-opacity-80 hover:text-opacity-50"
              onClick={() => setError(defaultError)}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="col-span-full sm:col-span-3">
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
          </div>
          <p className="mt-1 text-gray-600 text-sm">
            {selectedFiles.length
              ? `${selectedFiles.length} files Selected`
              : ""}
          </p>
        </div>
        <div className="col-span-full sm:col-span-3">
          <p className="text-lg font-medium text-slate-700">Selected Images</p>
          <div className="overflow-x-auto max-h-24">
            {selectedFiles.map((file) => (
              <li
                key={file.name}
                className="flex justify-between px-2  pb-1 border-b-2 border-gray-300 items-center"
              >
                <p title={file.name}>
                  {file.name.length > 60
                    ? `${file.name.slice(0, 60)}...`
                    : file.name}
                </p>
                <MdDelete
                  className="w-6 h-8 pt-1 cursor-pointer hover:text-red-600"
                  onClick={() => handleSelectedDeleteImage(file.name)}
                />
              </li>
            ))}
          </div>
        </div>
        {propertyData?.photos?.length ? (
          <div className="col-span-full sm:col-span-6 mb-2">
            <p className="text-lg font-medium text-slate-700">
              Uploaded Images
            </p>
            <div className="overflow-x-auto max-h-24">
              {propertyData.photos.map((url) => (
                <li
                  key={url}
                  className="flex justify-between px-2  pb-1 border-b-2 border-gray-300 items-center"
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-800 hover:text-blue-500 underline underline-offset-2"
                  >
                    {" "}
                    {url.slice(0, 60)}...
                  </a>
                  <MdDelete
                    className="w-6 h-8 pt-1 cursor-pointer hover:text-red-600"
                    onClick={() => handleDeleteImage(url)}
                  />
                </li>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
);

UploadImage.displayName = UploadImage;

export default UploadImage;
