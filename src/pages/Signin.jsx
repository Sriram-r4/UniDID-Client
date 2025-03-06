import React from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { Link } from "react-router-dom";
import { lazy, useState, Suspense } from "react";

const Signin = () => {
  const [Component, setComponent] = useState(null);
  const [data, setData] = useState(null);

  const loadComponent = (componentName, data = null) => {
    const components = {
      Email: lazy(() => import("../components/EmailSignin")),
      Mobile: lazy(() => import("../components/MobileSignin")),
      UniDID: lazy(() => import("../components/UniDIDSignin")),
      OTP: lazy(() => import("../components/OTPSignin")),
    };
    setData(data);
    setComponent(() => components[componentName]);
  };

  const goBack = () => {
    setComponent(null);
  };

  const goToOTP = (data) => {
    loadComponent("OTP", data);
  };

  return (
    <div className=" bg-gradient-to-br  from-[#2b4162] to-[#12100e] ">
      <Navbar />
      <section className="  sm:px-6 px-3 pt-16 pb-6 ">
        <div className="sm:p-6 p-3  rounded-lg bg-[#0a1b2b]/60  min-h-[44rem] border-[#0a1b2b]/50 grid sm:grid-cols-2 grid-rows-1 ">
          <div className="sm:min-h-[38rem] p-6  hidden sm:flex sm:flex-col justify-center">
            <div className="xl:text-5xl md:text-4xl sm:text-3xl text-white font-title px-2 py-1 font-medium">
              Welcome back to
              <span className="bg-gradient-to-r from-[#76daff] via-[#76daff] to-[#fcd000] bg-clip-text text-transparent font-bold">
                &nbsp;UniDID
              </span>
            </div>
            <div className="xl:text-3xl md:text-2xl sm:text-xl text-white font-title px-2 py-1 font-normal">
              Continue Where you have left!
            </div>
            <div className="xl:text-2xl md:text-xl sm:text-lg text-white font-title p-2">
              Add new Identity or modify existing one. Your progress has been
              stored and ready to continue anytime. You Say. We Serve.
            </div>
          </div>
          <div className="min-h-[42rem] ">
            <div className="sm:p-6 p-3 bg-[#2b4162] rounded-lg flex flex-col min-h-[42rem] justify-center">
              <div className="flex  justify-center">
                <div className="text-white font-bold font-title xl:text-3xl md:text-2xl text-xl px-2">
                  UniDID
                </div>
                <div className="text-white font-medium font-title xl:text-3xl md:text-2xl text-xl  ">
                  Sign In
                </div>
              </div>
              <div className="flex text-white font-title  xl:text-lg md:text-md text-sm sm:p-2 p-1 justify-center">
                New to UniDID?
                <span className="font-title font-bold text-blue-500 px-2  xl:text-lg md:text-md text-sm hover:underline hover:decoration-blue-500 hover:decoration-2 hover:text-white">
                  <Link to="/signup">Sign Up</Link>
                </span>
              </div>
              <div className="min-h-[32rem] w-full flex  justify-center sm:p-3 p-1 ">
                {!Component ? (
                  <div className="w-full flex gap-4 xl:flex-row flex-col items-center ">
                    <div className="bg-[#0a1b2b]/60 rounded-lg sm:p-6 p-3 flex flex-col flex-1 sm:min-h-[4rem] xl:h-[28rem]">
                      <button
                        className="w-full text-white font-title font-bold bg-[#2b4162]/80 hover:bg-white/90 hover:text-[#2b4162] rounded-lg sm:p-6 p-3"
                        onClick={() => loadComponent("UniDID")}
                      >
                        Log in using UniDID
                      </button>
                      <div className="text-white font-title  text-center text-sm sm:text-md lg:text-lg sm:p-3 p-1.5 ">
                        Enter your registered DID username and type password to
                        confirm.
                      </div>
                    </div>
                    <div className="bg-[#0a1b2b]/60 rounded-lg sm:p-6 p-3 flex flex-col  flex-1 sm:min-h-[4rem] xl:h-[28rem]">
                      <button
                        className="w-full text-white font-title font-bold bg-[#2b4162]/80 hover:bg-white/90 hover:text-[#2b4162] rounded-lg sm:p-6 p-3 "
                        onClick={() => loadComponent("Email")}
                      >
                        Log in using E-mail ID
                      </button>
                      <div className="text-white text-center font-title text-sm sm:text-md lg:text-lg sm:p-3 p-1.5">
                        Enter your registered e-mail id and you will receive 6
                        Digit OTP.
                      </div>
                    </div>
                    <div className="bg-[#0a1b2b]/60 font-title rounded-lg sm:p-6 p-3 flex flex-col flex-1 sm:min-h-[4rem] xl:h-[28rem]">
                      <button
                        className="w-full text-white font-bold font-title bg-[#2b4162]/80 hover:bg-white/90 hover:text-[#2b4162] rounded-lg sm:p-6 p-3"
                        onClick={() => loadComponent("Mobile")}
                      >
                        Log in using Mobile
                      </button>
                      <div className="text-white font-title text-center text-sm sm:text-md lg:text-lg sm:p-3 p-1.5">
                        Enter your registered phone number and you will receive
                        6 Digit OTP.
                      </div>
                    </div>
                  </div>
                ) : (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Component goBack={goBack} goToOTP={goToOTP} data={data} />
                  </Suspense>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
};

export default Signin;
