import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("SignupUser Service", error);
  }
};

export const signinUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/signin`, userData);
    return response.data;
  } catch (error) {
    console.error("SigninUser Service", error);
  }
};

export const fetchUser = async (userUnididId) => {
  try {
    if (userUnididId != null) {
      const response = await axios.get(`${API_BASE_URL}/user/${userUnididId}`);
      return response.data.user;
    }
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response?.data?.error || error.message
    );
    return null;
  }
};

export const getUserActivities = async (userUnididId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/user/activities/${userUnididId}`
    );
    return response.data.activities;
  } catch (error) {
    console.error(
      "Error fetching user activities:",
      error.response?.data?.error || error.message
    );
    return [];
  }
};

export const logUserActivity = async (
  userUnididId,
  action,
  description,
  status
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/activities/${userUnididId}/add`,
      {
        userUnididId,
        action,
        description,
        status,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error logging activity:",
      error.response?.data?.error || error.message
    );
  }
};

export const updateNewsletter = async (userUnididId, newsletter) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/${userUnididId}/newsletter`,
      { newsletter }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("Error updating newsletter.");
  }
};
