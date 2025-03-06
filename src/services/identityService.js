import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const createIdentity = async (walletId, identityData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/identities/${walletId}/add`,
      identityData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getIdentities = async (walletId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/identities/${walletId}`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching identities:", error);
    return [];
  }
};

export const deleteIdentity = async (walletId, id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/identities/${walletId}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
