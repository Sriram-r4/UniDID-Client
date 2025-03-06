import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOTP, resendOTP } from "../services/authService";

const OTPSignin = ({ goBack, goToOTP, data }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const nav = useNavigate();

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) return;
    let newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const [showFlex, setShowFlex] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFlex(true);
    }, 180000);

    return () => clearTimeout(timer);
  }, []);

  const handleValidate = async (e) => {
    e.preventDefault();
    const otpStr = otp.join("");
    const signinData = { otpStr, ...data };
    try {
      const response = await verifyOTP(signinData);
      alert("User Signed In successfully");
      setOtp(["", "", "", "", "", ""]);
      localStorage.setItem("activeUser", true);
      nav("/userdashboard");
    } catch (err) {
      console.error("Signin Error", err);
      alert(
        "Sorry! We could not sign you in right now. Please Try again after some time - UniDID Admin"
      );
      setOtp(["", "", "", "", "", ""]);
      nav("/");
    }
  };

  const handleResendOTP = async () => {
    const otpStr = otp.join("");
    const signinData = { ...data, otpStr };
    try {
      await resendOTP(
        signinData.email || signinData.phone || signinData.username
      );
      alert("OTP resent successfully. Please check your email.");
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={(e) => handleValidate(e)}>
        <div className="flex flex-col ">
          <div className="text-white text-md sm:text-xl lg:text-2xl font-medium font-title p-1">
            Enter OTP
          </div>
          <div className="text-white text-sm lg:text-md xl:text-lg font-title px-1">
            {" "}
            A 6 Digit OTP will be sent to your registered E-mail ID or Phone
            number.
          </div>
        </div>
        <div className="flex justify-center py-3 px-3">
          <div className="flex gap-2  xl:gap-6 justify-center ">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength={1}
                className="w-8 h-8 xs:w-10 xs:h-10  lg:w-14 lg:h-14 xl:w-20 xl:h-20  font-title text-center text-xl md:text-2xl xl:text-3xl font-bold  text-white   bg-[#0a1b2b]/60 rounded-md focus:outline-none focus:ring-2 focus:ring-white/60"
                required
                inputMode="numeric"
              />
            ))}
          </div>
        </div>
        <div className="flex p-2 w-full flex-col">
          <button
            className="bg-[#0a1b2b]/50 ring-1  ring-white/5 rounded-lg p-2 px-4 text-white hover:text-[#0a1b2b]/80 hover:bg-white/90 active:bg-white active:text-[#0a1b2b]/90 font-title font-bold xl:text-lg md:text-md text-sm"
            type="submit"
          >
            Validate OTP
          </button>
        </div>
        {showFlex && (
          <div className="flex p-2 w-full flex-col">
            <button
              className="bg-[#0a1b2b]/50 ring-1  ring-white/5 rounded-lg p-2 px-4 text-white hover:text-[#0a1b2b]/80 hover:bg-white/90 active:bg-white active:text-[#0a1b2b]/90 font-title font-bold xl:text-lg md:text-md text-sm"
              onClick={() => {
                handleResendOTP();
              }}
              type="button"
            >
              Resend OTP
            </button>
          </div>
        )}
        <div className="flex p-2 w-full flex-col">
          <button
            className="bg-[#0a1b2b]/50 ring-1  ring-white/5 rounded-lg p-2 px-4 text-white hover:text-[#0a1b2b]/80 hover:bg-white/90 active:bg-white active:text-[#0a1b2b]/90 font-title font-bold xl:text-lg md:text-md text-sm"
            onClick={goBack}
            type="button"
          >
            Try Again
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPSignin;
