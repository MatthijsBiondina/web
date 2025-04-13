import { useState } from "react";
import { chatService } from "services/chatService";

const useCreateChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createChat = async (subject, text) => {
    if (!subject.trim() || !text.trim()) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await chatService.createChat(subject, text);

      return response;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createChat };
};

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (message, chatId) => {
    try {
      setLoading(true);
      setError(null);
      console.log("useChatService.js: chatId", chatId);
      console.log("useChatService.js: message", message);

      const response = await chatService.sendMessage(message, chatId);

      return response;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, sendMessage };
};

const useRetrieveMessages = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrieveMessages = async (chatId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await chatService.retrieveMessages(chatId);

      return response.messages;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, retrieveMessages };
};

const useWaitForChatbotResponse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const waitForChatbotResponse = async (chatId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await chatService.waitForChatbotResponse(chatId);

      return response.message;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, waitForChatbotResponse };
};

export { useCreateChat, useRetrieveMessages, useWaitForChatbotResponse, useSendMessage };
