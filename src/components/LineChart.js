import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import formatDate from "../helper/DateFormatter";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ dataPoints }) => {
  const dates = dataPoints.map((point) => formatDate(point.date));
  const counts = dataPoints.map((point) => point.count);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Count",
        data: counts,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        pointBorderColor: "rgba(75,192,192,1)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: {
        title: { display: true, text: "Date", color: "rgba(255, 255, 255, 1)" },
      },
      y: {
        title: { display: true, text: "Count", color: "rgba(255, 255, 255,1)" },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
