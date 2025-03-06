import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { fetchUser } from "../services/userService";

const Profile = () => {
  const storedUnididId = JSON.parse(localStorage.getItem("userUnididId"));
  const storedWalletId = JSON.parse(localStorage.getItem("walletId"));

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUser(storedUnididId);
        setUser(userData);
      } catch (err) {
        console.error("Error in profile Page", err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="bg-gradient-to-br  from-[#2b4162] to-[#12100e]">
      <Navbar />
      <section className="sm:px-6 px-3 pt-16 pb-6 ">
        <div className="p-3 lg:p-6  rounded-lg bg-[#0a1b2b]/60  min-h-[34rem] border-[#0a1b2b]/50">
          <div className="max-w-full min-h-[30rem] mx-auto bg-[#2b4162] shadow-lg rounded-lg sm: p-3 sm:p-6">
            <h1 className="text-3xl lg:text-5xl font-semibold text-white/80 font-title mb-6 ">
              User Profile
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-lg font-medium  font-title text-white">
                    Name
                  </label>
                  <p className="mt-1 text-base text-[#0a1b2b] font-title font-semibold lg:text-xl">
                    {user.usrname || ""}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium text-white font-title">
                    Email
                  </label>
                  <p className="mt-1 text-base text-[#0a1b2b] font-title font-semibold lg:text-xl">
                    {user.email || ""}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium text-white font-title">
                    Phone
                  </label>
                  <p className="mt-1 text-base text-[#0a1b2b] font-title font-semibold lg:text-xl">
                    {user.phone || ""}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium text-white font-title">
                    Newsletter
                  </label>
                  <p className="mt-1 text-base text-[#0a1b2b] font-title font-semibold lg:text-xl">
                    {user.newsletter !== "" ? "Signed Up" : "Not yet signed up"}
                  </p>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-lg font-medium text-white font-title">
                    User Unidid ID
                  </label>
                  <p className="mt-1 text-base text-[#0a1b2b] font-title font-semibold lg:text-xl">
                    {user.userUnididId || ""}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium text-white">
                    Wallet ID
                  </label>
                  <p className="mt-1 text-base text-[#0a1b2b] font-title font-semibold lg:text-xl">
                    {user.walletId || ""}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium text-white font-title">
                    Date Of Creation
                  </label>
                  <p className="mt-1 text-base text-[#0a1b2b] font-title font-semibold lg:text-xl">
                    {new Date(user.dateOfCreation).toLocaleString() || ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
};

export default Profile;
