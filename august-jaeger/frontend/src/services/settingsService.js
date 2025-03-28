import { apiClient } from "./apiClient";

export const settingsService = {
  getSetting: async (setting) => {
    try {
      const response = await apiClient.get(`/settings/${setting}`);
      return response.data.setting;
    } catch (error) {
      console.error("Error getting setting:", error);
      return null;
    }
  },
};
