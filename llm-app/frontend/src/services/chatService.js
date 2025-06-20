import { apiClient } from "./apiClient";

// Chat services
export const chatService = {
  // Create chat
  createChat: async (subject, text) => {
    try {
      const response = await apiClient.post("/chat/create", { subject, text });
      return response.data;
    } catch (error) {
      console.error("Error creating chat:", error);
      return { error: "Error creating chat" };
    }
  },

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
  // Check message status
  checkMessageStatus: async (chatId) => {
    try {
      const response = await apiClient.get(`/chat/check-message-status?chatId=${chatId}`);
      return response.data;
    } catch (error) {
      console.error("Error checking message status:", error);
      return { error: "Error checking message status" };
    }
  },

  // Retrieve messages
  retrieveMessages: async (chatId) => {
    try {
      const response = await apiClient.get(`/chat/retrieve-messages?chatId=${chatId}`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving messages:", error);
      return { error: "Error retrieving messages" };
    }
  },

  // Retrieve email sent status
  retrieveEmailSentStatus: async (chatId) => {
    try {
      const response = await apiClient.get(`/chat/retrieve-email-sent-status?chatId=${chatId}`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving email sent status:", error);
      return { error: "Error retrieving email sent status" };
    }
  },

  // Wait for chatbot response
  waitForChatbotResponse: async (chatId) => {
    const pollInterval = 2000; // 2 seconds in milliseconds

    const pollForResponse = () => {
      return new Promise((resolve, reject) => {
        apiClient
          .get(`/chat/check-message-status?chatId=${chatId}`)
          .then((response) => {
            if (response.data.complete || response.data.failed) {
              resolve(response.data);
            } else {
              setTimeout(() => {
                pollForResponse().then(resolve).catch(reject);
              }, pollInterval);
            }
          })
          .catch((error) => {
            console.error("Error waiting for chatbot response:", error);
            reject({ error: "Error waiting for chatbot response" });
          });
      });
    };

    return pollForResponse();
  },

  // Get chats
  getAllChats: async () => {
    try {
      const response = await apiClient.get("/chat/get-all-chats");
      return response.data;
    } catch (error) {
      console.error("Error getting chats:", error);
      return { error: "Error getting chats" };
    }
  },

  // Get chats admin
  getAllChatsAdmin: async (pageNumber = 1) => {
    try {
      const response = await apiClient.get(
        `/admin/chats-database/get-all-chats?pageNumber=${pageNumber}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting chats:", error);
      return { error: "Error getting chats" };
    }
  },
};
