import axios from "axios";

const API_URL = "http://localhost:5000/auth";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("Error:", error.response?.data);
    throw error;
  }
};

export const verifyEmail = async (code) => {
  try {
    const response = await axios.post(`${API_URL}/verifyEmail`, code, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("Error:", error.response?.data);
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("Error:", error.response?.data);
    throw error;
  }
};

export const addPreference = async (prefData) => {
  try {
    const response = await axios.post(
      `${API_URL}/update-preferences`,
      prefData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    console.error("Error:", error.response?.data);
    throw error;
  }
};
