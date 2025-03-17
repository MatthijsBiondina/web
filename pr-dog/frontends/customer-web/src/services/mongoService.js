import axios from "axios";
import { auth } from "../firebase";

// eslint-disable-next-line no-undef
const API_URL = process.env.REACT_APP_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`[API REQUEST] ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

// User services
export const userService = {
  // Create or update user in MongoDB after Firebase auth
  createUser: async (userData = {}) => {
    console.log("API_URL for createUser:", API_URL);
    try {
      const response = await api.post("/users", userData);
      return response.data;
    } catch (error) {
      console.error("createUser failed with:", error.message);
      throw error;
    }
  },

  // Get user profile from MongoDB
  getProfile: async () => {
    console.log("API_URL for getProfile:", API_URL);
    try {
      const response = await api.get("/users/profile");
      return response.data;
    } catch (error) {
      console.error("getProfile failed with:", error.message);
      throw error;
    }
  },

  // Update user profile in MongoDB
  updateProfile: async (userData) => {
    console.log("API_URL for updateProfile:", API_URL);
    try {
      const response = await api.put("/users/profile", userData);
      return response.data;
    } catch (error) {
      console.error("updateProfile failed with:", error.message);
      throw error;
    }
  },

  acceptTerms: async () => {
    console.log("API_URL for acceptTerms:", API_URL);
    try {
      const response = await api.put("/users/profile", { hasAcceptedTerms: true });
      return response.data;
    } catch (error) {
      console.error("acceptTerms failed with:", error.message);
      throw error;
    }
  },
};
