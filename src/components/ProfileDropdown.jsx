import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { fetchUser, logUserActivity } from "../services/userService";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const storedUnididId = JSON.parse(localStorage.getItem("userUnididId"));
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = () => {
      const savedUser = JSON.parse(localStorage.getItem("activeUser"));
      setUser(savedUser ? true : false);
    };

    fetchUser();
    window.addEventListener("storage", fetchUser);
    return () => window.removeEventListener("storage", fetchUser);
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUser(storedUnididId);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching userDetails:", error);
      }
    };
    getUserData();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("activeUser");
      localStorage.removeItem("userUnididId");
      localStorage.removeItem("walletId");
      window.dispatchEvent(new Event("storage"));
      await logUserActivity(
        storedUnididId,
        "User Id Signed Out",
        "Don't worry, you will continue where you had left.",
        "Completed"
      );
      navigate("/signin");
    } catch (error) {}
  };

  return (
    <div className="relative h-12" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 hover:text-blue-500 p-2 mt-1 sm:mt-0 bg-transparent rounded-lg "
      >
        <i className="bi bi-person-circle "></i>
        <span className="font-medium text-clip  ">
          {userData ? userData.usrname : "User"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[12rem] bg-[#2b4162] shadow-lg rounded-lg p-2">
          <ul className="text-white font-semibold font-title ">
            {userData ? (
              <>
                <li
                  className="p-2 hover:bg-white/90 hover:text-[#2b4162] rounded-lg  cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  Profile Page
                </li>
                <li
                  className="p-2 hover:bg-white hover:text-red-500 rounded-lg  cursor-pointer text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <li
                  className="p-2 hover:bg-white/90 hover:text-[#2b4162] rounded-lg cursor-pointer"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
