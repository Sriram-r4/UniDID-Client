import axiosInstance from "./axiosInstance";
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api/user";

export const getUserDetails = async () => {
  try {
    const response = await axiosInstance.get("/user/details");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email) => {
  return await axios.post(`${API_BASE_URL}/forgot-password`, { email });
};
export const isAuthenticated = () => {
  const user = localStorage.getItem("activeUser");
  return user ? JSON.parse(user) === true : false;
};

export const signInUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/signin`, userData);
};

export const verifyOTP = async (signinData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-otp`, signinData);
    if (response.status === 200) {
      const { userUnididId, walletId } = response.data;

     
      localStorage.setItem("userUnididId", JSON.stringify(userUnididId));
      localStorage.setItem("walletId", JSON.stringify(walletId));
    }
  } catch (error) {
    console.error(
      "OTP verification failed:",
     error
    );
  }
};

export const resendOTP = async (identifier) => {
  return await axios.post(`${API_BASE_URL}/resend-otp`, { identifier });
};
