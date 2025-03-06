import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import LogoLarge from "../assets/logo-title-large.png";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserChart from "../components/UserChart";
import UserActivityTable from "../components/UserActivityTable";
import { getIdentities } from "../services/identityService";
import { fetchUser, getUserActivities } from "../services/userService";
import reverseDate from "../helper/DateReverser";

const UserDashboard = () => {
  const nav = useNavigate();
  const [walletId, setWalletId] = useState("");
  const storedWalletId = JSON.parse(localStorage.getItem("walletId"));
  const storedUnididId = JSON.parse(localStorage.getItem("userUnididId"));
  const [userData, setUserData] = useState({});
  const [userActivities, setUserActivities] = useState([]);
  const [allData, setAllData] = useState([]);
  const [identityStats, setIdentityStats] = useState({
    totalIdentities: 0,
    categoryCounts: {},
    uploadedFileCount: 0,
  });

  useEffect(() => {
    if (storedWalletId) {
      setWalletId(storedWalletId);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const identities = await getIdentities(storedWalletId);
        setAllData(identities);
      } catch (error) {
        console.error("Error fetching identities:", error);
        setAllData([]);
      }
    };
    fetchData();
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

  useEffect(() => {
    const fetchActivities = async () => {
      if (storedUnididId) {
        try {
          const activities = await getUserActivities(storedUnididId);
          setUserActivities(activities);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    if (allData.length > 0) {
      const totalIdentities = allData.length;

      const categoryCounts = allData.reduce((acc, identity) => {
        acc[identity.category] = (acc[identity.category] || 0) + 1;
        return acc;
      }, {});

      const uploadedFileCount = allData.filter(
        (identity) => identity.uploadedFile !== null
      ).length;

      setIdentityStats({
        totalIdentities,
        categoryCounts,
        uploadedFileCount,
      });
    }
  }, [allData]);

  return (
    <div className="bg-gradient-to-br  from-[#2b4162] to-[#12100e]">
      <Navbar />
      <section className="sm:px-6 px-3 pt-16 pb-6 ">
        <div className="p-3 lg:p-6  rounded-lg bg-[#0a1b2b]/60 min-h-[44rem] border-[#0a1b2b]/50">
          <div className="grid sm:grid-rows-5 xl:grid-rows-4 gap-0 p-1 sm:p-3 min-h-[40rem]">
            <div className=" grid sm:grid-cols-3 row-span-1 content-center">
              <div className="p-1 sm:p-3 ">
                <div className="ring-2 ring-[#3f0071]/50 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-[#000000] via-[#150050] to-[#3f0071] flex  min-h-[10rem] w-full p-2 sm:p-3 flex-col rounded-xl border-[#3f0071]/50">
                  <div className="flex flex-col py-2">
                    <div className="text-white font-title font-medium text-md sm:text-lg">
                      Wallet ID
                    </div>
                    <div className="text-white font-title text-lg sm:text-xl font-semibold flex justify-start pl-3">
                      {userData.walletId || "NA"}
                    </div>
                  </div>
                  <div className="flex flex-col py-2">
                    <div className="text-white font-title font-medium text-md sm:text-lg">
                      Username
                    </div>
                    <div className="text-white font-title text-lg sm:text-xl font-semibold pl-3">
                      {userData.usrname || ""}
                    </div>
                  </div>
                  <div className="flex flex-row justify-end">
                    <img
                      src={LogoLarge}
                      className="w-[8rem] h-[2.3rem] sm:h-[2.7rem] sm:pl-2 pb-1 object-contain"
                      alt="logo-large"
                    />
                  </div>
                </div>
              </div>
              <div className=" p-1 sm:p-3">
                <div className="bg-gradient-to-tl from-[#15803d] via-[#115e59] to-[#164e63] ring-[#164e63]/50 ring-2 flex  min-h-[10rem] w-full p-2 sm:p-3 flex-col rounded-xl border-[#164e63]/50">
                  <div className="flex flex-col py-2">
                    <div className="text-white font-title font-medium text-md sm:text-lg">
                      UniDID ID
                    </div>
                    <div className="text-white font-title text-lg sm:text-xl font-semibold flex justify-start pl-3">
                      {userData.userUnididId || "NA"}
                    </div>
                  </div>
                  <div className="flex flex-col py-2">
                    <div className="text-white font-title font-medium text-md sm:text-lg">
                      User since
                    </div>
                    <div className="text-white font-title text-lg sm:text-xl font-semibold pl-3">
                      {userData.dateOfCreation
                        ? reverseDate(
                            userData.dateOfCreation.toString().split("T")[0]
                          )
                        : ""}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="bg-green-700/50 rounded-2xl p-2  text-white  font-title text-md lg:text-xl">
                      Verified
                    </div>
                    <img
                      src={LogoLarge}
                      className="w-[8rem] h-[2.3rem] sm:h-[2.7rem]  pb-1 object-contain"
                      alt="logo-large"
                    />
                  </div>
                </div>
              </div>
              <div className=" p-1 sm:p-3">
                <div className="bg-[#2b4162] rounded-lg min-h-[10rem] w-full flex flex-col justify-center  p-2 sm:p-3">
                  <div className="text-white font-title font-medium text-md lg:text-xl text-center p-1 sm:p-2">
                    Settings
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="bi bi-gear text-white text-2xl lg:text-5xl p-2"></i>
                  </div>
                  <div className="text-white font-title font-normal text-sm md:text-lg pb-2 px-2 text-center ">
                    Modify your existing details
                  </div>
                  <button
                    className="rounded-lg text-white bg-[#0a1b2b]/50 p-2 px-4 font-title font-semibold hover:text-[#2b4162] hover:bg-white"
                    onClick={() => {
                      nav("/profile");
                    }}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-2 row-span-2 xl:row-span-1 ">
              <div className="md:col-span-12 xl:col-span-8 content-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
                  {[
                    {
                      title: "Total Identities",
                      number: identityStats.totalIdentities,
                    },
                    {
                      title: "Uploaded Files",
                      number: identityStats.uploadedFileCount,
                    },
                    ...Object.entries(identityStats.categoryCounts).map(
                      ([category, count]) => ({
                        title: category,
                        number: count,
                      })
                    ),
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="w-full max-w-xs h-[8rem] bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-5 shadow-xl flex flex-col items-center justify-center"
                    >
                      <h3 className="text-white text-md sm:text-lg font-semibold">
                        {stat.title}
                      </h3>
                      <p className="text-white text-xl sm:text-2xl font-bold">
                        {stat.number}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-12 xl:col-span-4 content-center rounded-xl">
                <UserChart />
              </div>
            </div>
            <div className="overflow-auto row-span-2 xl:row-span-2 p-1 sm:p-3">
              <UserActivityTable />
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
};

export default UserDashboard;
