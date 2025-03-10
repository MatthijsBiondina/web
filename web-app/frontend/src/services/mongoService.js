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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(
      `[API] Request successful: ${response.config.method.toUpperCase()} ${response.config.url}`
    );
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        `[API ERROR] ${error.config.method.toUpperCase()} ${error.config.url} - ${
          error.response.status
        }`,
        error.response.data
      );
    } else if (error.request) {
      console.error(`[API ERROR] No response received`, error.request);
    } else {
      console.error(`[API ERROR] ${error.message}`);
    }
    return Promise.reject(error);
  }
);

// User services
export const userService = {
  // Create or update user in MongoDB after Firebase auth
  createUser: async (userData = {}) => {
    console.log("API_URL: ", API_URL);
    const response = await api.post("/users", userData);
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
