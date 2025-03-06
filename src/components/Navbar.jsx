import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import LogoLarge from "../assets/logo-title-large.png";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [dropmenu, setDropmenu] = useState(false);

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
    <div>
      <nav className="fixed  top-0 h-12 mb-2 left-0 right-0 backdrop-blur-sm bg-[#0a1b2b]/60 font-title z-10 sm:mb-2 sm:drop-shadow-lg drop-shadow-lg  grid grid-cols-3 w-full sm:grid-cols-12 sm:h-12   ">
        <div className=" sm:col-span-2 sm:p-2 p-2 pt-2 order-2 sm:order-1 text-white  flrx justify-center">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={LogoLarge}
              className="w-[8rem] h-[2.3rem] sm:h-[2.7rem] sm:pl-2 pb-1 object-contain"
              alt="logo-large"
            />
          </Link>
        </div>
        {user ? (
          <div className=" p-2 hidden sm:col-span-9 text-white font-medium sm:flex sm:order-2 sm:justify-end  ">
            <Link
              to="/"
              className="sm:px-2 hover:text-blue-500"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </Link>
            <Link
              to="/userdashboard"
              className="sm:px-2 hover:text-blue-500  "
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Dashboard
            </Link>
            <Link
              to="/userwallet"
              className="sm:px-2  hover:text-blue-500"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Wallet
            </Link>
            <Link
              to="/usertable"
              className="sm:px-2  hover:text-blue-500"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Table
            </Link>
            <Link
              to="/userform"
              className="sm:px-2  hover:text-blue-500"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Form
            </Link>
          </div>
        ) : (
          <div className=" p-2 hidden sm:col-span-9 text-white font-medium sm:flex sm:order-2 sm:justify-end  ">
            <Link
              to="/"
              className="sm:px-2 hover:text-blue-500 "
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="sm:px-2 hover:text-blue-500  "
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Dashboard
            </Link>
            <Link
              to="/signup"
              className="sm:px-2  hover:text-blue-500"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Sign Up
            </Link>
          </div>
        )}
        <div className="sm:hidden flex justify-start order-1 px-3  col-span-auto  text-white">
          <button
            onClick={() => {
              console.log("Pressed");
              setDropmenu(!dropmenu);
            }}
            aria-label="Open Menu"
          >
            {dropmenu === false ? (
              <i
                className="bi bi-list "
                style={{ fontSize: "1.5rem", padding: "0.25rem" }}
              ></i>
            ) : (
              <i
                className="bi bi-x"
                style={{ fontSize: "1.5rem", padding: "0.25rem" }}
              ></i>
            )}
          </button>
        </div>
        <div className=" sm:col-span-1 h-12 pt-0.4 sm:pt-0.4 text-white flex sm:justify-center  pr-3 justify-end order-3 sm:order-3">
          <ProfileDropdown />
        </div>
      </nav>
      {dropmenu && (
        <>
          {user ? (
            <div className="fixed w-full grid grid-rows-5 backdrop-blur-sm font-medium bg-[#0a1b2b]/60 z-10 sm:hidden  h-48  top-12">
              <div className="row-span-1 px-2 pt-2 text-white order-1 flex justify-start">
                <Link
                  to="/"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="w-full"
                >
                  <i
                    className="bi bi-house-door"
                    style={{ paddingRight: "0.5rem" }}
                  ></i>
                  Home
                </Link>
              </div>
              <div className="row-span-1 px-2 pt-2 text-white order-2 flex justify-start">
                <Link
                  to="/userdashboard"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="w-full"
                >
                  <i
                    className="bi bi-kanban"
                    style={{ paddingRight: "0.5rem" }}
                  ></i>
                  Dashboard
                </Link>
              </div>
              <div className="row-span-1 px-2 pt-2 text-white order-3 flex justify-start">
                <Link
                  to="/userwallet"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="w-full"
                >
                  <i
                    className="bi bi-wallet"
                    style={{ paddingRight: "0.5rem" }}
                  ></i>
                  Wallet
                </Link>
              </div>
              <div className="row-span-1 px-2 pt-2 text-white order-3 flex justify-start">
                <Link
                  to="/usertable"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="w-full"
                >
                  <i
                    className="bi bi-table"
                    style={{ paddingRight: "0.5rem" }}
                  ></i>
                  Table
                </Link>
              </div>
              <div className="row-span-1 px-2 pt-2 text-white order-3 flex justify-start">
                <Link
                  to="/userform"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="w-full"
                >
                  <i
                    className="bi bi-file-earmark-text"
                    style={{ paddingRight: "0.5rem" }}
                  ></i>
                  Form
                </Link>
              </div>
            </div>
          ) : (
            <div className="fixed w-full grid grid-rows-3 backdrop-blur-sm font-medium bg-[#0a1b2b]/60 z-10 sm:hidden  h-36 top-12">
              <div className="row-span-1 px-2 pt-2 text-white order-1 flex justify-start">
                <Link
                  to="/"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="w-full"
                >
                  <i
                    className="bi bi-house-door"
                    style={{ paddingRight: "0.5rem" }}
                  ></i>
                  Home
                </Link>
              </div>
              <div className="row-span-1 px-2 pt-2 text-white order-2 flex justify-start">
                <Link
                  to="/dashboard"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="w-full"
                >
                  <i
                    className="bi bi-kanban"
                    style={{ paddingRight: "0.5rem" }}
                  ></i>
                  Dashboard
                </Link>
              </div>
              <div className="row-span-1 px-2 pt-2 text-white order-3 flex justify-start">
                <Link
                  to="/signup"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="w-full"
                >
                  <i
                    className="bi bi-person-plus-fill"
                    style={{ paddingRight: "0.5rem" }}
                  ></i>
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
