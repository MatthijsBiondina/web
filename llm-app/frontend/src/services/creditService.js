import { apiClient } from "./apiClient";

// Credit services
export const creditService = {
  // Get balance
  getBalance: async () => {
    try {
      const response = await apiClient.get("/credit/balance");
      return response.data;
    } catch (error) {
      console.error("Error getting balance:", error);
      return { amount: "⁉️", error: "Error getting balance" };
    }
  },

  checkSufficientCredits: async (taskType) => {
    try {
      const response = await apiClient.get(`/credit/check-sufficient-credits?taskType=${taskType}`);
      return response.data;
    } catch (error) {
      console.error("Error checking sufficient credits:", error);
      return { sufficient: false, error: "Error checking sufficient credits" };
    }
  },
};
