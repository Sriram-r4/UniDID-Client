import React from "react";

const FormPreview = ({ formData }) => {
  return (
    <div className="w-full mt-6 p-4 bg-[#0a1b2b]/30 border border-[#2b4162]/50 rounded-lg text-white">
      <h3 className="text-lg sm:text-xl xl:text-2xl font-title font-semibold">
        Form Preview
      </h3>
      <p className="text-sm sm:text-md xl:text-lg font-title text-gray-300">
        This section dynamically updates as you fill the form.
      </p>

      <div className="mt-4 space-y-2">
        {formData.idname && (
          <div className="flex justify-between border-b border-gray-600 pb-1">
            <span className="font-semibold">Identity Name:</span>
            <span>{formData.idname}</span>
          </div>
        )}

        {formData.category && (
          <div className="flex justify-between border-b border-gray-600 pb-1">
            <span className="font-semibold">Category:</span>
            <span>{formData.category}</span>
          </div>
        )}

        {formData.identityType && (
          <div className="flex justify-between border-b border-gray-600 pb-1">
            <span className="font-semibold">Identity Type:</span>
            <span>
              {formData.identityType === "number" ? "Number" : "Password"}
            </span>
          </div>
        )}

        {formData.idOwned && (
          <div className="flex justify-between border-b border-gray-600 pb-1">
            <span className="font-semibold">ID Owned By:</span>
            <span>{formData.idOwned}</span>
          </div>
        )}

        {(formData.identityType === "number" ||
          formData.category === "Government IDs" ||
          formData.category === "Educational IDs") &&
          formData.idnum && (
            <div className="flex justify-between border-b border-gray-600 pb-1">
              <span className="font-semibold">ID Number:</span>
              <span>{formData.idnum}</span>
            </div>
          )}

        {(formData.identityType === "password" ||
          formData.category === "Socials") &&
          formData.username && (
            <div className="flex justify-between border-b border-gray-600 pb-1">
              <span className="font-semibold">Username:</span>
              <span>{formData.username}</span>
            </div>
          )}

        {(formData.identityType === "password" ||
          formData.category === "Socials") &&
          formData.password && (
            <div className="flex justify-between border-b border-gray-600 pb-1">
              <span className="font-semibold">Password:</span>
              <span className="text-gray-400">••••••</span>
            </div>
          )}

        {formData.webUrl && (
          <div className="flex justify-between border-b border-gray-600 pb-1">
            <span className="font-semibold">Website URL:</span>
            <span>{formData.webUrl}</span>
          </div>
        )}

        {formData.dateOfIssue && (
          <div className="flex justify-between border-b border-gray-600 pb-1">
            <span className="font-semibold">Date of Issue:</span>
            <span>{formData.dateOfIssue}</span>
          </div>
        )}

        {formData.uploadedFile && (
          <div className="flex justify-between border-b border-gray-600 pb-1">
            <span className="font-semibold">Uploaded File:</span>
            <span>{formData.uploadedFile.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormPreview;
