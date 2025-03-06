import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const getOverallStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard/overallstats`);
    return response.data.stats;
  } catch (error) {
    console.error(
      "Error fetching overall stats:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getRegistrationStats = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/dashboard/registration-stats`
    );
    return response.data.registrationStats;
  } catch (error) {
    console.error(
      "Error fetching registration stats:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFunctionActivityLogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard/logs`);
    return response.data.logs;
  } catch (error) {
    console.error(
      "Error fetching function activity logs:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postFunctionActivityLog = async (LogData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/dashboard/logs/add`,
      LogData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error posting function activity log:",
      error.response?.data || error.message
    );
    throw error;
  }
};
