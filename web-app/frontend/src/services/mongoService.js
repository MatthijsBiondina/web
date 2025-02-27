import axios from "axios";
import { auth } from "../firebase";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User services
export const userService = {
  // Create or update user in MongoDB after Firebase auth
  createUser: async (hasAcceptedTerms = false) => {
    const response = await api.post("/users", { hasAcceptedTerms });
    return response.data;
  },

  // Get user profile from MongoDB
  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  // Update user profile in MongoDB
  updateProfile: async (userData) => {
    const response = await api.put("/users/profile", userData);
    return response.data;
  },

  acceptTerms: async () => {
    const response = await api.put("/users/profile", { hasAcceptedTerms: true });
    return response.data;
  },
};
