import { apiClient } from "./apiClient";

export const adminService = {
  // Clear chats database
  clearChatsDatabase: async () => {
    try {
      const response = await apiClient.delete("/admin/chats-database/clear-chats-database");
      return response.data;
    } catch (error) {
      console.error("Error clearing chats database:", error);
      return { error: "Error clearing chats database" };
    }
  },
};
