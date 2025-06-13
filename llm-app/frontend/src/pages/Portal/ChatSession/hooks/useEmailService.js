import { useState } from "react";
import { emailService } from "services/emailService";

const useAskProfessor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const askProfessor = async (chatId, userName, userEmail) => {
    try {
      setLoading(true);
      setError(null);
      const response = await emailService.askProfessor(chatId, userName, userEmail);
      return response;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, askProfessor };
};

export default useAskProfessor;
