import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import FileUpload from "../components/FileUpload";
import FormPreview from "../components/FormPreview";
import { createIdentity } from "../services/identityService";
import { logUserActivity } from "../services/userService";
import { postFunctionActivityLog } from "../services/dashboardService";

const UserForm = () => {
  const [formData, setFormData] = useState({
    idname: "",
    category: "",
    idOwned: "",
    identityType: "",
    idnum: "",
    dateOfIssue: "",
    username: "",
    password: "",
    webUrl: "",
    uploadedFile: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [walletId, setWalletId] = useState("");
  const storedWalletId = JSON.parse(localStorage.getItem("walletId"));
  const storedUnididId = JSON.parse(localStorage.getItem("userUnididId"));
  useEffect(() => {
    if (storedWalletId) {
      setWalletId(storedWalletId);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      let updatedData = { ...prevData, [name]: value };

      if (name === "category") {
        updatedData = {
          ...updatedData,
          uploadedFile: null,
          identityType: "",
          idOwned: "",
          ...(prevData.category === "Government IDs" && {
            idname: "",
            idnum: "",
            dateOfIssue: "",
          }),
          ...(prevData.category === "Educational IDs" && {
            idname: "",
            idnum: "",
            dateOfIssue: "",
          }),
          ...(prevData.identityType === "Socials" && {
            idname: "",
            username: "",
            password: "",
            webUrl: "",
          }),
          ...(prevData.identityType === "Others" && {
            idname: "",
            identityType: "",
            idnum: "",
            dateOfIssue: "",
            username: "",
            password: "",
            webUrl: "",
          }),
        };
      }

      if (name === "identityType") {
        updatedData = {
          ...updatedData,
          ...(value === "number"
            ? { username: "", password: "", webUrl: "", uploadedFile: null }
            : { idnum: "", dateOfIssue: "", uploadedFile: null }),
        };
      }

      return updatedData;
    });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    if (name === "idname") {
      if (!value.trim()) errorMsg = "Name is required";
      else if (value.length < 3)
        errorMsg = "Name must be at least 3 characters";
    }

    if (name === "category") {
      if (!value) errorMsg = "Please select a category";
    }

    if (name === "idOwned") {
      if (!value) errorMsg = "Please select an input type";
    }

    if (name === "idnum") {
      const numRegex = /^[0-9]+$/;
      if (!value.trim()) errorMsg = "Number is required";
      else if (!numRegex.test(value))
        errorMsg = "Only numeric values are allowed";
    }

    if (name === "dateOfIssue") {
      const today = new Date().toISOString().split("T")[0];

      if (!value) {
        errorMsg = "Date of Issue is required";
      } else if (value > today) {
        errorMsg = "Date of Issue cannot be in the future";
      }
    }

    if (name === "username") {
      if (!value.trim()) errorMsg = "Username is required";
      else if (value.length < 3)
        errorMsg = "Username must be at least 3 characters";
    }

    if (name === "password") {
      if (!value.trim()) errorMsg = "Password is required";
      else if (value.length < 6)
        errorMsg = "Password must be at least 6 characters";
    }

    if (name === "webUrl" && value) {
      const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(:\d+)?(\/\S*)?$/;
      if (!urlRegex.test(value)) errorMsg = "Enter a valid URL";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    Object.keys(formData).forEach((field) => {
      const errorMsg = validateField(field, formData[field]);
      if (errorMsg) {
        newErrors[field] = errorMsg;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const dataToSubmit = { ...formData };
    const LogData = { fun: "Identity Added", status: "Completed" };
    try {
      await createIdentity(walletId, dataToSubmit);
      await logUserActivity(
        storedUnididId,
        "Add Identity",
        `${formData.idname} was added successfully to UniDID`,
        "Completed"
      );
      await postFunctionActivityLog(LogData);
      alert("Identity Added Succesfully");
      setFormData({
        idname: "",
        category: "",
        idOwned: "",
        identityType: "",
        idnum: "",
        dateOfIssue: "",
        username: "",
        password: "",
        webUrl: "",
        uploadedFile: null,
      });
    } catch (error) {
      const LogFailedData = { fun: "Identity Added", status: "Failed" };
      console.error("Error creating identity", error);
      await logUserActivity(
        storedUnididId,
        "Add Identity",
        `Failed to add ${formData.idname} to UniDID`,
        "Failed"
      );
      await postFunctionActivityLog(LogFailedData);
    }
  };

  return (
    <div className="bg-gradient-to-br  from-[#2b4162] to-[#12100e]">
      <Navbar />
      <section className="sm:px-6 px-3 pt-16 pb-6 ">
        <div className="p-3 sm:p-6 rounded-lg bg-[#0a1b2b]/60  min-h-[54rem] border-[#0a1b2b]/50">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className=" rounded-lg bg-[#2b4162] min-h-[52rem] grid sm:grid-cols-2 ">
              <div className="flex flex-col justify-center">
                <div className="flex flex-col justify-center p-1 sm:p-3 flex-wrap">
                  <div className="text-white text-lg sm:text-xl xl:text-2xl font-title font-semibold pt-1 px-2">
                    Name&nbsp;
                    <sup className=" text-red-500 text-sm lg:text-md">*</sup>
                  </div>
                  <p className="text-white text-md  xl:text-lg font-title font-normal pb-1 px-2">
                    Enter the Name of the identity you are going to add. (e.g.
                    Driving Licence)
                  </p>
                  <div className="w-full px-1.5 lg:px-1.5 py-1 ">
                    <input
                      type="text"
                      name="idname"
                      value={formData.idname}
                      onChange={handleInputChange}
                      placeholder="ID Name"
                      className="rounded-lg w-full bg-white/50 focus:bg-white/90 hover:bg-white/70 ring-1 ring-[#2b4162]/50 text-[#2b4162] placeholder-[#2b4162]/50 focus:outline-none focus:ring-2 focus:ring-white/5 font-title font-medium md:text-xl sm:text-lg xl:text-xl py-1 px-2"
                      required
                      autoFocus
                    />
                    {errors.idname && (
                      <p className="text-red-400 text-base lg:text-md font-title  px-1.5">
                        {errors.idname}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center p-1 sm:p-3 flex-wrap">
                  <div className="text-white text-lg sm:text-xl xl:text-2xl font-title font-semibold pt-1 px-2">
                    Category&nbsp;
                    <sup className=" text-red-500 text-sm lg:text-md">*</sup>
                  </div>
                  <p className="text-white text-md  xl:text-lg font-title font-normal pb-1 px-2">
                    Enter the Category of the identity you are going to add.
                    (e.g. Government ID)
                  </p>
                  <div className="w-full px-1.5 lg:px-1.5 py-1 ">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="rounded-lg w-full bg-white/50 focus:bg-white/90 hover:bg-white/70 ring-1 ring-[#2b4162]/50 text-[#2b4162] placeholder-[#2b4162]/50 focus:outline-none focus:ring-2 focus:ring-white/5 font-title font-medium md:text-xl sm:text-lg xl:text-xl py-1 px-2"
                      required
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      <option value="Government IDs">Government IDs</option>
                      <option value="Educational IDs">Educational IDs</option>
                      <option value="Socials">Socials</option>
                      <option value="Others">Others</option>
                    </select>
                    {errors.idname && (
                      <p className="text-red-400 text-base lg:text-md font-title  px-1.5">
                        {errors.category}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center p-1 sm:p-3 flex-wrap">
                  <div className="text-white text-lg sm:text-xl xl:text-2xl font-title font-semibold pt-1 px-2">
                    Select Identity Ownership&nbsp;
                    <sup className="text-red-500 text-sm lg:text-md">*</sup>
                  </div>

                  <p className="text-white text-md xl:text-lg font-title font-normal pb-1 px-2">
                    Choose whether the identity you are going to add belongs to
                    you or not.
                  </p>

                  <div className="w-full px-1.5 lg:px-1.5 py-1">
                    <div className="flex gap-4 px-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="idOwned"
                          value="You"
                          checked={formData.idOwned === "You"}
                          onChange={handleInputChange}
                          className="form-radio text-blue-500"
                        />
                        <span className="text-white text-md sm:text-lg xl:text-xl font-title">
                          You
                        </span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="idOwned"
                          value="Others"
                          checked={formData.idOwned === "Others"}
                          onChange={handleInputChange}
                          className="form-radio text-blue-500"
                        />
                        <span className="text-white text-md sm:text-lg xl:text-xl font-title">
                          Others
                        </span>
                      </label>
                    </div>

                    {errors.idOwned && (
                      <p className="text-red-400 text-base lg:text-md font-title px-1.5">
                        {errors.idOwned}
                      </p>
                    )}
                  </div>
                </div>

                {formData.category === "Others" && (
                  <div className="flex flex-col justify-center p-1 sm:p-3 flex-wrap">
                    <div className="text-white text-lg sm:text-xl xl:text-2xl font-title font-semibold pt-1 px-2">
                      Select Identity Type&nbsp;
                      <sup className="text-red-500 text-sm lg:text-md">*</sup>
                    </div>

                    <p className="text-white text-md xl:text-lg font-title font-normal pb-1 px-2">
                      Choose whether this identity is{" "}
                      <span className="text-white font-bold">Number-Based</span>{" "}
                      (e.g., Government ID) or{" "}
                      <span className="text-white font-bold">
                        Password-Based
                      </span>
                      (e.g., Social Accounts).
                    </p>

                    <div className="w-full px-1.5 lg:px-1.5 py-1">
                      <div className="flex gap-4 px-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="identityType"
                            value="number"
                            checked={formData.identityType === "number"}
                            onChange={handleInputChange}
                            className="form-radio text-blue-500"
                          />
                          <span className="text-white text-md sm:text-lg xl:text-xl font-title">
                            Number-Based Identity
                          </span>
                        </label>

                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="identityType"
                            value="password"
                            checked={formData.identityType === "password"}
                            onChange={handleInputChange}
                            className="form-radio text-blue-500"
                          />
                          <span className="text-white text-md sm:text-lg xl:text-xl font-title">
                            Password-Based Identity
                          </span>
                        </label>
                      </div>

                      {errors.identityType && (
                        <p className="text-red-400 text-base lg:text-md font-title px-1.5">
                          {errors.identityType}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {(formData.category === "Government IDs" ||
                  formData.category === "Educational IDs" ||
                  formData.identityType === "number") && (
                  <div>
                    <div className="flex flex-col justify-center p-1 sm:p-3 flex-wrap">
                      <div className="text-white text-lg sm:text-xl xl:text-2xl font-title font-semibold pt-1 px-2">
                        Identity Number&nbsp;
                        <sup className="text-red-500 text-sm lg:text-md">*</sup>
                      </div>
                      <p className="text-white text-md xl:text-lg font-title font-normal pb-1 px-2">
                        Enter the identity number or credential number
                        associated with this identity.
                      </p>
                      <div className="w-full px-1.5 lg:px-1.5 py-1">
                        <input
                          type="text"
                          name="idnum"
                          value={formData.idnum}
                          onChange={handleInputChange}
                          placeholder="Enter Number"
                          className="rounded-lg w-full bg-white/50 focus:bg-white/90 hover:bg-white/70 ring-1 ring-[#2b4162]/50 text-[#2b4162] placeholder-[#2b4162]/50 focus:outline-none focus:ring-2 focus:ring-white/5 font-title font-medium md:text-xl sm:text-lg xl:text-xl py-1 px-2"
                          required
                        />
                        {errors.num && (
                          <p className="text-red-400 text-base lg:text-md font-title px-1.5">
                            {errors.num}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-1 sm:p-3 flex-wrap">
                      <div className="text-white text-lg sm:text-xl xl:text-2xl font-title font-semibold pt-1 px-2">
                        Date of Issue&nbsp;
                        <sup className="text-red-500 text-sm lg:text-md">*</sup>
                      </div>

                      <p className="text-white text-md xl:text-lg font-title font-normal pb-1 px-2">
                        Select the date when this identity was issued.
                      </p>

                      <div className="w-full px-1.5 lg:px-1.5 py-1">
                        <input
                          type="date"
                          name="dateOfIssue"
                          value={formData.dateOfIssue || ""}
                          onChange={handleInputChange}
                          className="rounded-lg w-full bg-white/50 focus:bg-white/90 hover:bg-white/70 ring-1 ring-[#2b4162]/50 text-[#2b4162] placeholder-[#2b4162]/50 focus:outline-none focus:ring-2 focus:ring-white/5 font-title font-medium md:text-xl sm:text-lg xl:text-xl py-1 px-2"
                          required
                        />

                        {errors.dateOfIssue && (
                          <p className="text-red-400 text-base lg:text-md font-title px-1.5">
                            {errors.dateOfIssue}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {(formData.category === "Socials" ||
                  formData.identityType === "password") && (
                  <div>
                    <div className="flex flex-col justify-center p-1 sm:p-3 flex-wrap">
                      <div className="text-white text-lg sm:text-xl xl:text-2xl font-title font-semibold pt-1 px-2">
                        Username&nbsp;
                        <sup className="text-red-500 text-sm lg:text-md">*</sup>
                      </div>

                      <p className="text-white text-md xl:text-lg font-title font-normal pb-1 px-2">
                        Enter your username associated with the identity.
                      </p>

                      <div className="w-full px-1.5 lg:px-1.5 py-1">
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          placeholder="Enter Username"
                          className="rounded-lg w-full bg-white/50 focus:bg-white/90 hover:bg-white/70 ring-1 ring-[#2b4162]/50 text-[#2b4162] placeholder-[#2b4162]/50 focus:outline-none focus:ring-2 focus:ring-white/5 font-title font-medium md:text-xl sm:text-lg xl:text-xl py-1 px-2"
                          required
                        />
                        {errors.username && (
                          <p className="text-red-400 text-base lg:text-md font-title px-1.5">
                            {errors.username}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center p-1 mb-1.5 sm:p-3 flex-wrap">
                      <div className="text-white text-lg sm:text-xl xl:text-2xl font-title font-semibold pt-1 px-2">
                        Password&nbsp;
                        <sup className="text-red-500 text-sm lg:text-md">*</sup>
                      </div>

                      <p className="text-white text-md xl:text-lg font-title font-normal pb-1 px-2">
                        Enter the password associated with the social identity.
                      </p>

                      <div className="w-full px-1.5 lg:px-1.5 py-1 relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter Password"
                          className="rounded-lg w-full bg-white/50 focus:bg-white/90 hover:bg-white/70 ring-1 ring-[#2b4162]/50 text-[#2b4162] placeholder-[#2b4162]/50 focus:outline-none focus:ring-2 focus:ring-white/5 font-title font-medium md:text-xl sm:text-lg xl:text-xl py-1 px-2 pr-10"
                          required
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-3 flex items-center text-[#2b4162]"
                        >
                          {showPassword ? "👁" : "🔒"}
                        </button>

                        {errors.password && (
                          <p className="absolute  text-red-400 text-base lg:text-md font-title px-1.5">
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-1 sm:p-3 flex-wrap">
                      <div className="text-white text-lg sm:text-xl xl:text-2xl font-title font-semibold pt-1 px-2">
                        Website URL
                      </div>
                      <p className="text-white text-md xl:text-lg font-title font-normal pb-1 px-2">
                        Enter the website URL associated with this account
                        (optional).
                      </p>
                      <div className="w-full px-1.5 lg:px-1.5 py-1">
                        <input
                          type="text"
                          name="webUrl"
                          value={formData.webUrl}
                          onChange={handleInputChange}
                          placeholder="Enter Website URL"
                          className="rounded-lg w-full bg-white/50 focus:bg-white/90 hover:bg-white/70 ring-1 ring-[#2b4162]/50 text-[#2b4162] placeholder-[#2b4162]/50 focus:outline-none focus:ring-2 focus:ring-white/5 font-medium text-lg py-1 px-2"
                        />
                        {errors.webUrl && (
                          <p className="text-red-400 text-base lg:text-md font-title px-1.5">
                            {errors.webUrl}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center pb-2">
                {formData.category === "Socials" ||
                formData.identityType === "password" ? (
                  <></>
                ) : (
                  <div className="flex flex-col justify-center">
                    <FileUpload formData={formData} setFormData={setFormData} />
                  </div>
                )}
                <div className="flex p-2 flex-col justify-center">
                  <FormPreview formData={formData} />
                </div>
                <div className="flex px-2  w-full flex-col">
                  <button
                    className="bg-[#0a1b2b]/50 ring-1  ring-white/5 rounded-lg p-3  text-white hover:text-[#0a1b2b]/80 hover:bg-white/90 active:bg-white active:text-[#0a1b2b]/90 font-title font-bold xl:text-lg md:text-md text-sm"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <FooterSection />
    </div>
  );
};

export default UserForm;
