import { apiClient } from "./apiClient";

// Chat services
export const chatService = {
  // Create chat
  createChat: async (subject, text) => {
    try {
      console.log("Creating chat:", subject, text);
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

  checkMessageStatus: async (chatId) => {
    try {
      const response = await apiClient.get(`/chat/check-message-status?chatId=${chatId}`);
      return response.data;
    } catch (error) {
      console.error("Error checking message status:", error);
      return { error: "Error checking message status" };
    }
  },

  retrieveMessages: async (chatId) => {
    try {
      const response = await apiClient.get(`/chat/retrieve-messages?chatId=${chatId}`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving messages:", error);
      return { error: "Error retrieving messages" };
    }
  },

  waitForChatbotResponse: async (chatId) => {
    const pollInterval = 2000; // 2 seconds in milliseconds

    const pollForResponse = () => {
      return new Promise((resolve, reject) => {
        apiClient
          .get(`/chat/check-message-status?chatId=${chatId}`)
          .then((response) => {
            if (response.data.complete) {
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
};
