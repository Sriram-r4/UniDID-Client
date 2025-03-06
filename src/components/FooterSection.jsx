import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoLarge from "../assets/logo-title-large.png";
import { updateNewsletter } from "../services/userService";

const FooterSection = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const storedUnididId = JSON.parse(localStorage.getItem("userUnididId"));

  const handleChange = (e) => setNewsletterEmail(e.target.value);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(newsletterEmail)) {
      return;
    }
    try {
      await updateNewsletter(storedUnididId, newsletterEmail);
      setNewsletterEmail("");
    } catch (error) {
      console.error("Error");
      setNewsletterEmail("");
    }
  };

  const [user, setUser] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      const savedUser = JSON.parse(localStorage.getItem("activeUser"));
      setUser(savedUser === true ? true : false);
    };
    fetchUser();
    window.addEventListener("storage", fetchUser);
    return () => window.removeEventListener("storage", fetchUser);
  }, []);

  return (
    <div className="min-h-[16rem] py-6 sm:px-6 px-3 ">
      <footer className="bg-[#0a1b2b]/60 grid grid-rows-2 p-6 border border-[#0a1b2b]/50 rounded-lg shadow-xl ">
        <div className=" grid w-full min-h-[7rem] row-span-1   sm:grid-cols-12 grid-rows-2 sm:grid-rows-1 ">
          <div className="col-span-5 p-4 flex flex-wrap flex-col ">
            <div className="text-lg sm:text-xl font-title font-bold text-white p-1">
              <img
                src={LogoLarge}
                alt="UniDID-logo-large"
                className="min-h-[3rem] w-[8rem] sm:w-[10rem] md:w-[12rem]"
              />
            </div>
            <div className="text-md sm:text-lg font-title font-medium text-white p-1 pl-3 sm:pl-5">
              Your Digital Identity Manager for One Decentralized Identity.
            </div>
          </div>
          <div className="col-span-7 p-4   flex sm:items-center lg:justify-start justify-center flex-wrap ">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <input
                type="email"
                id="newsletter"
                name="newsletter"
                placeholder="name@gmail.com"
                pattern="^[^@\s]+@(gmail\.com|outlook\.com)$"
                title="Please enter a valid Gmail or Outlook email address (e.g., imleo@gmail.com or im_leo@outlook.com)"
                className="rounded-lg px-2 py-1 my-2 sm:w-64 w-56 bg-[#2b4162] ring-2 ring-[#0a1b2b]/50  font-title font-medium  text-white border-white focus:outline-none focus:ring-4 focus:ring-[#1b2e40]"
                value={newsletterEmail}
                onChange={(e) => handleChange(e)}
              />
              <button
                type="submit"
                className="px-2 py-1 bg-[#2b4162] ring-2 ring-[#0a1b2b]/50 rounded-lg hover:bg-white/90 hover:text-[#2b4162]  text-white sm:mx-4 mx-2 w-24"
              >
                Join Us
              </button>
            </form>
          </div>
        </div>
        <div className=" grid w-full min-h-[7rem]  row-span-1 sm:grid-cols-12 grid-rows-2 sm:grid-rows-1 ">
          <div className="col-span-6 p-4 flex flex-wrap flex-col">
            <div className="font-title font-bold text-lg sm:text-xl text-white">
              Links
            </div>
            {user ? (
              <div className="text-white text-md sm:text-lg font-title font-medium flex flex-row flex-wrap justify-between py-2">
                <Link
                  to="/"
                  className="hover:text-blue-500"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Home
                </Link>
                <Link
                  to="/userdashboard"
                  className="hover:text-blue-500"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Dashboard
                </Link>
                <Link
                  to="/userwallet"
                  className="hover:text-blue-500"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Wallet
                </Link>
                <Link
                  to="/usertable"
                  className="hover:text-blue-500"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Table
                </Link>
                <Link
                  to="/userform"
                  className="hover:text-blue-500"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Form
                </Link>
              </div>
            ) : (
              <div className="text-white text-md sm:text-lg font-title font-medium flex  flex-wrap justify-between flex-row  py-2">
                <Link
                  to="/"
                  className="hover:text-blue-500 pr-2"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-500 pr-2"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Dashboard
                </Link>
                <Link
                  to="/signin"
                  className="hover:text-blue-500 pr-2"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="hover:text-blue-500 pr-2"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          <div className="col-span-6 p-4  flex flex-wrap flex-col">
            <div className="text-white font-title font-bold text-lg sm:text-xl">
              Contact us
            </div>
            <div className="text-white font title text-md sm:text-lg">
              Made with &#129505; by Batch C15 of PEC CSE Department.
            </div>
            <div className="font-title text-white text-md sm:text-lg">
              E-mail Address
            </div>
          </div>
        </div>
        {/* <div className="bg-blue-500 h-[2rem] flex py-1 px-4 row-span-1">End</div> */}
      </footer>
    </div>
  );
};

export default FooterSection;
