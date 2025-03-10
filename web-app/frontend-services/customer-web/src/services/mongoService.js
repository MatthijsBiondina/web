import axios from "axios";
import { auth } from "../firebase";

// eslint-disable-next-line no-undef
const API_URL = process.env.REACT_APP_API_URL;

console.log("=====================================================");
console.log("Starting mongoService with API_URL:", API_URL);
console.log("Environment variables:", process.env);
console.log("=====================================================");

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

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(
      `[API] Request successful: ${response.config.method.toUpperCase()} ${response.config.url}`
    );
    return response;
  },
  (error) => {
    console.log("=====================================================");
    console.log("DETAILED CONNECTION ERROR INFORMATION:");

    // Log the full error object to see all available properties
    console.dir(error, { depth: null });

    if (error.response) {
      console.error(
        `[API ERROR] ${error.config.method.toUpperCase()} ${error.config.url} - ${
          error.response.status
        }`,
        error.response.data
      );
    } else if (error.request) {
      console.error(`[API ERROR] No response received`, error.request);
      console.log("[CONNECTION DETAILS]");
      console.log("- Full URL:", `${error.config.baseURL}${error.config.url}`);
      console.log("- Timeout:", error.config.timeout);
      console.log("- Request headers:", error.config.headers);

      // Try to get network information
      if (navigator && navigator.connection) {
        console.log("- Network Type:", navigator.connection.effectiveType);
        console.log("- Network Downlink:", navigator.connection.downlink);
      }

      // Try to check if we can connect to other domains
      console.log("- Trying connection test to google.com...");
      fetch("https://www.google.com", { mode: "no-cors" })
        .then(() => console.log("  > Connection to google.com successful"))
        .catch((err) => console.log("  > Connection to google.com failed:", err));
    } else {
      console.error(`[API ERROR] ${error.message}`);
    }
    console.log("=====================================================");

    return Promise.reject(error);
  }
);

// Function to test the connection
const testConnection = async () => {
  try {
    console.log("Testing connection to API...");
    await fetch(`${API_URL}/health-check`, {
      method: "GET",
      mode: "no-cors",
      cache: "no-cache",
    });
    console.log("Basic connection test succeeded");
  } catch (error) {
    console.error("Basic connection test failed:", error);
  }
};

// Run the test immediately
testConnection();

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
