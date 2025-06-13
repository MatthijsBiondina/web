import { apiClient } from "./apiClient";

export const emailService = {
  askProfessor: async (chatId, userName, userEmail) => {
    const response = await apiClient.post("/email/ask-professor", {
      chatId,
      userName,
      userEmail,
    });
    return response.data;
  },
};
