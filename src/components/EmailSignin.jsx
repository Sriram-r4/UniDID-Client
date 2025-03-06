import React, { useState } from "react";
import { signinUser } from "../services/userService";
const EmailSignin = ({ goBack, goToOTP }) => {
  const [email, setEmail] = useState("");

  const dataToOTP = { email: email };

  const handleForward = async (e) => {
    e.preventDefault();

    const userData = { identifier: dataToOTP.email };
    if (dataToOTP.email !== "") {
      try {
        await signinUser(userData);
        goToOTP(dataToOTP);
        setEmail("");
      } catch (err) {
        console.error("Email sending error", err);
      }
    } else alert("Invalid Email!");
  };

  return (
    <div className="w-full">
      <form onSubmit={(e) => handleForward(e)}>
        <div className="flex py-1 sm:py-3 sm:px-1 w-full flex-col">
          <div className="text-white  xl:text-lg md:text-md text-sm font-title pb-1">
            E-mail ID
          </div>
          <input
            name="emailid"
            type="email"
            pattern="^[^@\s]+@(gmail\.com|outlook\.com)$"
            title="Please enter a valid Gmail or Outlook email address (e.g., imleo@gmail.com or im_leo@outlook.com)"
            className="rounded-lg w-full bg-white/50 focus:bg-white/90 hover:bg-white/70 ring-1 ring-[#2b4162]/50 text-[#2b4162] placeholder-[#2b4162]/50 focus:outline-none focus:ring-2 focus:ring-white/5 font-title font-medium md:text-xl sm:text-lg py-1 px-2 invalid:ring-red-600/50 invalid:ring-2 valid:ring-green-600/50 valid:ring-2"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="imleo@gmail.com"
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
        <div className="text-white font-title  text-sm sm:text-md lg:text-xl py-1 sm:py-3 sm:px-1">
          Enter your email ID, and you will receive a 6-digit OTP in your
          registered email. Please wait for some time to receive the OTP.
        </div>
        <br />
        <hr />
        <div className="flex py-2 flex-col">
          <div className="flex py-1 sm:px-1 w-full">
            <div className="text-white   xl:text-lg md:text-md text-sm font-title pb-1">
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

export default EmailSignin;
