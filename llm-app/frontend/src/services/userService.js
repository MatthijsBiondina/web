import { apiClient } from "./apiClient";

// User services
export const userService = {
  // Get user profile from MongoDB
  getProfile: async () => {
    const response = await apiClient.get("/users/profile");
    return response.data;
  },

  // Update user profile in MongoDB
  updateProfile: async (userData) => {
    const response = await apiClient.put("/users/profile", userData);
    return response.data;
  },

  // Create MongoDB user
  createUser: async (userData = {}) => {
    const response = await apiClient.post("/users", userData);
    return response.data;
  },

  acceptTerms: async () => {
    const response = await apiClient.put("/users/profile", { hasAcceptedTerms: true });
    return response.data;
  },
};
