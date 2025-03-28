import axios from "axios";
import { auth } from "../firebase";
import { handleApiError } from "../utils/errorHandler";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Create shared axios instance with common configuration
const createApiClient = () => {
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

  // Add response interceptor for error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const customError = handleApiError(error);
      return Promise.reject(customError);
    }
  );

  return api;
};

// Export a singleton instance
export const apiClient = createApiClient();
