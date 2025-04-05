import { useState, useEffect } from "react";

import { settingsService } from "services/settingsService";

const useGetWelcomeMessage = () => {
  const [welcomeMessage, setWelcomeMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await settingsService.getSetting("chat-initial-message");
        setWelcomeMessage(response);
      } catch (error) {
        console.error("Error fetching welcome message:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWelcomeMessage();
  }, []);

  return { welcomeMessage, loading };
};

export default useGetWelcomeMessage;
