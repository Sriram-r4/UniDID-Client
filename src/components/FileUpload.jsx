import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ formData, setFormData }) => {
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setError("Only PDF files are allowed.");
        return;
      }

      const uploadedFile = acceptedFiles[0];

      if (uploadedFile.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB.");
        return;
      }

      setFormData((prev) => ({ ...prev, uploadedFile }));
      setError("");

      setUploadProgress(0);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setUploadProgress(progress);
        if (progress >= 100) clearInterval(interval);
      }, 500);
    },
    [setFormData]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, uploadedFile: null }));
    setUploadProgress(0);
  };

  return (
    <div className="flex flex-col justify-center p-1 sm:p-3 flex-wrap">
      <div className="text-white text-lg sm:text-xl xl:text-2xl font-title font-semibold pt-1 px-2">
        Upload Identity Document
      </div>

      <p className="text-white text-md xl:text-lg font-title font-normal pb-1 px-2">
        Drag & drop a <span>PDF file</span> here, or click to select one (Max
        5MB).
      </p>

      <div className="px-1.5">
        <div
          {...getRootProps()}
          className="w-full px-6 py-8  border-2 border-dashed border-white/90 mx-auto my-1 rounded-xl bg-[#0a1b2b]/30 hover:bg-[#0a1b2b]/40 transition-all cursor-pointer flex flex-col items-center justify-center text-center"
        >
          <input {...getInputProps()} />

          {formData.uploadedFile ? (
            <div className="flex flex-col items-center space-y-2  relative">
              <i className="bi bi-file-earmark-pdf text-white text-4xl"></i>
              <p className="text-white text-lg font-title">
                {formData.uploadedFile.name}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="absolute -top-3 -right-3 text-red-500 hover:text-red-700 transition"
              >
                <i className="bi bi-x-circle text-2xl"></i>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <i className="bi bi-cloud-upload text-white text-5xl"></i>
              <p className="text-white text-md sm:text-lg font-title">
                Click to Upload or Drag & Drop
              </p>
            </div>
          )}
        </div>
      </div>

      {formData.uploadedFile && uploadProgress > 0 && (
        <div className=" px-1.5 ">
          <div className="w-full bg-white/20 rounded-full mt-3 mx-auto">
            <div
              className="bg-green-500 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-400 text-base lg:text-md font-title px-1.5">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
