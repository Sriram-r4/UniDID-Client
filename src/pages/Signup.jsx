import React, { useState } from "react";
import FooterSection from "../components/FooterSection";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/userService";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [phno, setPhno] = useState("");
  const [check, setCheck] = useState(false);

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      usrname: username,
      email: email,
      password: pwd,
      phone: phno,
      remember: check,
      function: "User Added",
      newsletter: "",
    };
    try {
      await signupUser(userData);
      alert("User Signed up for UniDID");
      handleReset();
      nav("/signin");
    } catch (err) {
      console.error("Error signing up:", err);
    }
  };

  const handleReset = () => {
    setUserName("");
    setEmail("");
    setPhno("");
    setPwd("");
    setCheck(false);
  };

  return (
    <div className="  bg-gradient-to-br  from-[#2b4162] to-[#12100e]">
      <Navbar />
      <section className=" px-3  sm:px-6 pt-16 pb-6 ">
        <div className="p-3 sm:p-6 rounded-lg bg-[#0a1b2b]/60  min-h-[44rem] border-[#0a1b2b]/50 grid sm:grid-cols-2 grid-rows-1 shadow-xl ">
          <div className="sm:min-h-[38rem] p-6  hidden sm:flex sm:flex-col justify-center">
            <div className="xl:text-5xl md:text-4xl sm:text-3xl text-white font-title px-2 py-1 font-medium">
              Welcome to
              <span className="bg-gradient-to-r from-[#76daff] via-[#76daff] to-[#fcd000] bg-clip-text text-transparent font-bold">
                &nbsp;UniDID
              </span>
            </div>
            <div className="xl:text-3xl md:text-2xl sm:text-xl text-white font-title px-2 py-1  font-normal">
              Your Journey with us, Starts here!
            </div>
            <div className="xl:text-2xl md:text-xl sm:text-lg text-white font-title p-2">
              To continue using our Services, You need to join with us. Your
              Details are safely stored and secure with us. You Provide. You Own
              and We Serve.
            </div>
          </div>
          <div className="min-h-[42rem]">
            <form
              className="sm:p-6 p-1 bg-[#2b4162] rounded-lg flex flex-col min-h-[42rem] justify-center"
              onSubmit={(e) => handleSubmit(e)}
              id="signup-form"
            >
              <div className="flex  justify-center">
                <div className="text-white font-bold xl:text-3xl md:text-2xl text-xl px-2">
                  UniDID
                </div>
                <div className="text-white font-medium xl:text-3xl md:text-2xl text-xl  ">
                  Sign Up
                </div>
              </div>
              <div className="flex text-white font-title  xl:text-lg md:text-md text-sm sm:p-2 p-1 justify-center">
                Already have an account?
                <span className="font-title font-bold text-blue-500 px-2  xl:text-lg md:text-md text-sm hover:underline hover:decoration-blue-500 hover:decoration-2 hover:text-white">
                  <Link to="/signin">Sign In</Link>
                </span>
              </div>
              <div className="flex p-2 w-full flex-col">
                <div className="text-white  xl:text-lg md:text-md text-sm font-title">
                  Username
                </div>
                <input
                  name="username"
                  type="text"
                  className="rounded-lg w-full bg-white/50 focus:bg-white/90 hover:bg-white/70 ring-1 ring-[#2b4162]/50 text-[#2b4162] placeholder-[#2b4162]/50 focus:outline-none focus:ring-2 focus:ring-white/5 font-title font-medium md:text-xl sm:text-lg py-1 px-2 invalid:ring-red-600/50 invalid:ring-2 valid:ring-green-600/50 valid:ring-2"
                  value={username}
                  pattern="[a-zA-Z0-9_.\-]{3,25}"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  onInput={(e) =>
                    e.target.setCustomValidity(
                      e.target.validity.patternMismatch
                        ? "Invalid username. Enter 3 to 25 characters using case-insensitive letters, numbers, underscores (_), hyphens (-), or dots (.)"
                        : ""
                    )
                  }
                  placeholder="Leo.12"
                  title="Enter 3 to 25 characters using case-insensitive letters, numbers, underscores (_), hyphens (-), or dots (.)"
                  required
                  autoFocus
                />
              </div>
              <div className="flex p-2 w-full flex-col">
                <div className="text-white  xl:text-lg md:text-md text-sm font-title">
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
                  onInput={(e) =>
                    e.target.setCustomValidity(
                      e.target.validity.patternMismatch
                        ? "Invalid E-mail. Please enter a valid Gmail or Outlook email address (e.g., imleo@gmail.com or im_leo@outlook.com)"
                        : ""
                    )
                  }
                  placeholder="imleo@gmail.com"
                  required
                />
              </div>
              <div className="flex p-2 w-full flex-col">
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
                  onInput={(e) =>
                    e.target.setCustomValidity(
                      e.target.validity.patternMismatch
                        ? "Invalid Password. Password must be 6-20 characters long, contain at least one uppercase letter, one digit, and one special character (-, _, ., or @)"
                        : ""
                    )
                  }
                  placeholder="Set Password"
                  required
                />
              </div>
              <div className="flex p-2 w-full flex-col">
                <div className="text-white  xl:text-lg md:text-md text-sm font-title">
                  Phone Number (Optional)
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
                  onInput={(e) =>
                    e.target.setCustomValidity(
                      e.target.validity.patternMismatch
                        ? "Invalid Phone number. Phone number must be 10 digit from 0-9. Country Code is not needed"
                        : ""
                    )
                  }
                  placeholder="9876543210"
                />
              </div>
              <div className="flex text-white font-title  xl:text-lg md:text-md text-sm sm:p-2 p-1 justify-between w-full ">
                <div className="sm:p-2 p-1 ">
                  <label className="text-white font-title xl:text-lg  text-md sm:p-2 p-1 align-middle ">
                    <input
                      type="checkbox"
                      checked={check}
                      onChange={() => setCheck(!check)}
                      className=" w-4 h-4 align-middle mb-0.5"
                    />
                    &nbsp;&nbsp;Remember Me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                  }}
                  className="text-white font-title xl:text-lg md:text-md text-sm sm:p-2 p-1 "
                >
                  Clear All
                </button>
              </div>
              <div className="flex p-2 w-full flex-col">
                <button
                  className="bg-[#0a1b2b]/50 ring-1  ring-white/5 rounded-lg p-2 px-4 text-white hover:text-[#0a1b2b]/80 hover:bg-white/90 active:bg-white active:text-[#0a1b2b]/90 font-title font-bold xl:text-lg md:text-md text-sm"
                  type="submit"
                >
                  Submit
                </button>
              </div>
              <div className="flex p-1 px-2 w-full ">
                <p className="text-white font-title xl:text-md lg:text-sm text-xs text-center">
                  By clicking Submit button, you authorize us to create an
                  account for you and agree to our Terms & Conditions.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
};

export default Signup;
