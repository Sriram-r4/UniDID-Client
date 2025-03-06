import React from "react";
import { useState } from "react";
import { signinUser } from "../services/userService";

const UniDIDSignin = ({ goBack, goToOTP }) => {
  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");

  const dataToOTP = { username: uname, password: pwd };

  const handleForward = async (e) => {
    e.preventDefault();
    if (dataToOTP.username !== "" && dataToOTP.password !== "") {
      const userData = {
        identifier: dataToOTP.username,
        password: dataToOTP.password,
      };

      try {
        await signinUser(userData);
        goToOTP(dataToOTP);
        setUname("");
        setPwd("");
      } catch (err) {
        console.error("UniDID sending error", err);
      }
    } else alert("Invalid UNIDID ID and Password");
  };

  return (
    <div className="w-full ">
      <form onSubmit={(e) => handleForward(e)}>
        <div className="flex py-1 sm:py-3 sm:px-1 w-full flex-col">
          <div className="text-white  xl:text-lg md:text-md text-sm font-title pb-1">
            UniDID UserID
          </div>
          <input
            name="username"
            type="text"
            className="rounded-lg w-full bg-white/50 focus:bg-white/90 hover:bg-white/70 ring-1 ring-[#2b4162]/50 text-[#2b4162] placeholder-[#2b4162]/50 focus:outline-none focus:ring-2 focus:ring-white/5 font-title font-medium md:text-xl sm:text-lg py-1 px-2 invalid:ring-red-600/50 invalid:ring-2 valid:ring-green-600/50 valid:ring-2"
            value={uname}
            pattern="[a-zA-Z0-9_.\-]{3,25}"
            onChange={(e) => {
              setUname(e.target.value);
            }}
            placeholder="465825464852"
            title="Enter 12 digit UniDID number"
            required
            autoFocus
          />
        </div>

        <div className="flex py-1 sm:py-3 sm:px-1 w-full flex-col">
          <div className="text-white  xl:text-lg md:text-md text-sm font-title">
            Password
          </div>
          <input
            name="pwd"
            type="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}"
            title="Password must be 6-20 characters long, contain at least one uppercase letter, one digit, and one special character (-, _, ., or @)"
            className="rounded-lg w-full bg-white/50 focus:bg-white/90 hover:bg-white/70 ring-1 ring-[#2b4162]/50 text-[#2b4162] placeholder-[#2b4162]/50 focus:outline-none focus:ring-2 focus:ring-white/5 font-title font-medium md:text-xl sm:text-lg py-1 px-2 invalid:ring-red-600/50 invalid:ring-2 valid:ring-green-600/50 valid:ring-2"
            value={pwd}
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            placeholder="Set Password"
            required
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
          Enter your UniDID userID and password, and you will receive a 6-digit
          OTP in your registered email. Please wait for some time to receive the
          OTP.
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

export default UniDIDSignin;
