import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getIdentities } from "../services/identityService";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [identityStats, setIdentityStats] = useState({
    totalIdentities: 0,
    categoryCounts: {},
    uploadedFileCount: 0,
  });
  const storedWalletId = JSON.parse(localStorage.getItem("walletId"));
  const [walletId, setWalletId] = useState("");
 
  useEffect(() => {
    if (storedWalletId) {
      setWalletId(storedWalletId);
    }
  }, []);

  useEffect(() => {
    const fetchIdentityStats = async () => {
      try {
        let identities = await getIdentities(storedWalletId);
        identities = Array.isArray(identities) ? identities : []; 
  
        const totalIdentities = identities.length;
        const categoryCounts = identities.reduce((acc, identity) => {
          acc[identity.category] = (acc[identity.category] || 0) + 1;
          return acc;
        }, {});
  
        const uploadedFileCount = identities.filter(
          (identity) => identity.uploadedFile !== null
        ).length;
  
        setIdentityStats({
          totalIdentities,
          categoryCounts,
          uploadedFileCount,
        });
      } catch (error) {
        console.error("Error fetching identity stats:", error);
        setIdentityStats({
          totalIdentities: 0,
          categoryCounts: {},
          uploadedFileCount: 0,
        });
      }
    };
  
    fetchIdentityStats();
  }, []); 

  const chartData = {
    labels: [
      "Total Identities",
      "Government IDs",
      "Educational IDs",
      "Socials",
      "Others",
      "Files Uploaded",
    ],
    datasets: [
      {
        label: "Count",
        data: [
          identityStats.totalIdentities,
          identityStats.categoryCounts["Government IDs"] || 0,
          identityStats.categoryCounts["Educational IDs"] || 0,
          identityStats.categoryCounts["Socials"] || 0,
          identityStats.categoryCounts["Others"] || 0,
          identityStats.uploadedFileCount || 0,
        ],
        backgroundColor: [
          "#4CAF50", // Green
          "#FF9800", // Orange
          "#3F51B5", // Blue
          "#E91E63", // Pink
          "#9E9E9E", // Gray
          "#00BCD4", // Cyan
        ],
        borderColor: ["#ffffff"], // White border
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#ffffff", // Text color
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        bodyFont: {
          size: 14,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl">
      {/* <h2 className="text-white text-lg font-semibold text-center mb-3">
        Identity Stats
      </h2> */}
      <div className="min-h-[16rem]">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
