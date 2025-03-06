import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import LineChart from "../components/LineChart";
import ActivityTable from "../components/ActivityTable";
import { useNavigate } from "react-router-dom";
import {
  getFunctionActivityLogs,
  getOverallStats,
  getRegistrationStats,
} from "../services/dashboardService";

const Dashboard = () => {
  const nav = useNavigate();

  const [overallStats, setOverallStats] = useState({});
  const [registrationStats, setRegistrationStats] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const overall = await getOverallStats();
        const registration = await getRegistrationStats();
        const logs = await getFunctionActivityLogs();
        setOverallStats(overall);
        setRegistrationStats(registration);
        setActivityLogs(logs);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-gradient-to-br  from-[#2b4162] to-[#12100e]">
      <Navbar />
      <section className="sm:px-6 px-3 pt-16 pb-6 ">
        <div className="p-3 lg:p-6  rounded-lg bg-[#0a1b2b]/60  min-h-[44rem] border-[#0a1b2b]/50">
          <div className="grid sm:grid-rows-2 sm:grid-cols-12 min-h-[40rem]">
            <div className=" sm:p-3 p-1 sm:col-span-7 hidden sm:flex sm:justify-center sm:items-center ">
              <LineChart dataPoints={registrationStats} />
            </div>
            <div
              className=" sm:p-3 p-1 sm:col-span-7 flex 
            sm:hidden flex-col justify-evenly"
            >
              <div className="bg-[#2b4162] my-4 flex  flex-col items-center p-3  rounded-lg ring-1 ring-white/50">
                <div className="text-white font-title font-medium text-lg sm:text-xl lg:text-2xl ">
                  DIDs Created
                </div>
                <div className="text-white font-title font-bold text-xl sm:text-2xl lg:text-3xl ">
                  {overallStats.totalUsers || 0}
                </div>
              </div>
              <div className="bg-[#2b4162] my-4 flex flex-col items-center p-3 rounded-lg ring-1 ring-white/50">
                <div className="text-white font-title font-medium text-lg sm:text-xl lg:text-2xl ">
                  Identities Added
                </div>
                <div className="text-white font-title font-bold text-xl sm:text-2xl lg:text-3xl ">
                  {overallStats.totalIdentities || 0}
                </div>
              </div>
            </div>
            <div className="p-1 sm:p-3 sm:col-span-5 content-center ">
              <div className="bg-[#2b4162] flex flex-col rounded-lg p-1 sm:py-3 sm:px-2 ">
                <div className="hidden sm:flex sm:flex-col">
                  <div className="flex justify-between px-2 py-1 ">
                    <div className="text-white font-title  text-lg sm:text-xl lg:text-2xl ">
                      DIDs Created
                    </div>
                    <div className="text-white font-title font-bold text-xl sm:text-2xl lg:text-3xl px-2 ">
                      {overallStats.totalUsers || 0}
                    </div>
                  </div>
                  <div className="flex justify-between px-2 py-1">
                    <div className="text-white font-title  text-lg sm:text-xl lg:text-2xl ">
                      Identities Added
                    </div>
                    <div className="text-white font-title font-bold text-xl sm:text-2xl lg:text-3xl px-2 ">
                      {overallStats.totalIdentities || 0}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between px-2 py-1">
                  <div className="text-white font-title  text-lg sm:text-xl lg:text-2xl ">
                    Government IDs
                  </div>
                  <div className="text-white font-title font-bold text-xl sm:text-2xl lg:text-3xl px-2 ">
                    {overallStats.governmentIds || 0}
                  </div>
                </div>
                <div className="flex justify-between px-2 py-1">
                  <div className="text-white font-title  text-lg sm:text-xl lg:text-2xl ">
                    Educational IDs
                  </div>
                  <div className="text-white font-title font-bold text-xl sm:text-2xl lg:text-3xl px-2 ">
                    {overallStats.educationalIds || 0}
                  </div>
                </div>
                <div className="flex justify-between px-2 py-1">
                  <div className="text-white font-title  text-lg sm:text-xl lg:text-2xl ">
                    Social Links
                  </div>
                  <div className="text-white font-title font-bold text-xl sm:text-2xl lg:text-3xl px-2 ">
                    {overallStats.socialIds || 0}
                  </div>
                </div>
                <div className="flex justify-between px-2 py-1">
                  <div className="text-white font-title  text-lg sm:text-xl lg:text-2xl ">
                    Others
                  </div>
                  <div className="text-white font-title font-bold text-xl sm:text-2xl lg:text-3xl px-2 ">
                    {overallStats.othersIds || 0}
                  </div>
                </div>
                <div className="flex justify-between px-2 py-1">
                  <div className="text-white font-title  text-lg sm:text-xl lg:text-2xl ">
                    Files
                  </div>
                  <div className="text-white font-title font-bold text-xl sm:text-2xl lg:text-3xl px-2 ">
                    {overallStats.filesUploaded || 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-1 sm:p-3 my-4 sm:col-span-8">
              <ActivityTable data={activityLogs} />
            </div>
            <div className="p-1 sm:p-3 my-4 content-center sm:col-span-4">
              <div className="flex items-center justify-center min-h-[20rem]">
                <div className="relative w-full min-h-[18rem] p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 flex flex-col items-center justify-center text-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-md opacity-50"></div>
                  <div className="relative z-5 flex flex-col items-center ">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Decentralized Identity Wallet
                    </h2>
                    <p className="text-white/80 mt-2 text-center">
                      A decentralized, blockchain-powered identity solution that
                      gives you full control over your digital identity securely
                      and privately. Join the future of identity management
                      today.
                    </p>
                    <button
                      className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition"
                      onClick={() => {
                        nav("/signin");
                      }}
                    >
                      Access Wallet
                    </button>
                  </div>
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

export default Dashboard;
