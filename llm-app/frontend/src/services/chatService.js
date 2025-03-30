import { apiClient } from "./apiClient";

// Chat services
export const chatService = {
  // Send message
  sendMessage: async (text, chatId = null) => {
    try {
      const response = await apiClient.post("/chat/send-message", { text, chatId });
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      return { error: "Error sending message" };
    }
  },

  checkMessageStatus: async (chatId) => {
    try {
      const response = await apiClient.get(`/chat/check-message-status?chatId=${chatId}`);
      return response.data;
    } catch (error) {
      console.error("Error checking message status:", error);
      return { error: "Error checking message status" };
    }
  },
};
