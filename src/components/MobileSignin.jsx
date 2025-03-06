import React, { useState } from "react";
import { signinUser } from "../services/userService";

const MobileSignin = ({ goBack, goToOTP }) => {
  const [phno, setPhno] = useState("");

  const dataToOTP = { phone: phno };
  const handleForward = async (e) => {
    e.preventDefault();
    const userData = { identifier: `+91${dataToOTP.phone}` };
    if (dataToOTP.phone !== "") {
      try {
        await signinUser(userData);
        goToOTP(dataToOTP);
        setPhno("");
      } catch (err) {
        console.error("Error in Phone number page", err);
      }
    } else alert("Invalid Email!");
  };

  return (
    <div className="w-full">
      <form onSubmit={(e) => handleForward(e)}>
        <div className="flex p-2 w-full flex-col">
          <div className="text-white  xl:text-lg md:text-md text-sm font-title">
            Phone Number
          </div>
          <input
            name="phno"
            type="tel"
            pattern="^\d{10}$"
            title="Phone number must be 10 digit from 0-9. Country Code is not needed"
            className="rounded-lg w-full bg-white/50  focus:bg-white/90 hover:bg-white/70 focus:ring-[#2b4162]/50 focus:ring-2  ring-1 ring-[#2b4162]/50 text-[#2b4162] placeholder-[#2b4162]/50 focus:outline-none font-title font-medium md:text-xl sm:text-lg py-1 px-2 invalid:ring-red-600/50 invalid:ring-2 valid:ring-green-600/50 valid:ring-2 "
            value={phno}
            onChange={(e) => {
              setPhno(e.target.value);
            }}
            placeholder="9876543210"
            required
            autoFocus
          />
        </div>

        <div className="flex py-1 sm:py-3 sm:px-1 w-full flex-col">
          <button
            className="bg-[#0a1b2b]/50 ring-1  ring-white/5 rounded-lg p-2 px-4 text-white hover:text-[#0a1b2b]/80 hover:bg-white/90 active:bg-white active:text-[#0a1b2b]/90 font-title font-bold xl:text-lg md:text-md text-sm"
            type="submit"
          >
            Get OTP
          </button>
        </div>
        <div className="text-white font-title text-sm sm:text-md lg:text-xl py-1 sm:py-3 sm:px-1">
          Enter your email ID, and you will receive a 6-digit OTP in your
          registered email. Please wait for some time to receive the OTP.
        </div>
        <br />
        <hr />
        <div className="flex py-2 flex-col">
          <div className="flex py-1 sm:px-1 w-full">
            <div className="text-white  xl:text-lg md:text-md text-sm font-title pb-1">
              Trouble Logging in ? Don't worry !
            </div>
          </div>
          <div className="flex py-1  w-full flex-col">
            <button
              className="bg-[#0a1b2b]/50 ring-1  ring-white/5 rounded-lg p-2 px-4 text-white hover:text-[#0a1b2b]/80 hover:bg-white/90 active:bg-white active:text-[#0a1b2b]/90 font-title font-bold xl:text-lg md:text-md text-sm"
              onClick={goBack}
            >
              Try Other ways
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MobileSignin;
