import { createContext, useState, useContext, useEffect } from "react";
import { chatService } from "services/chatService";
import PropTypes from "prop-types";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState(null);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlChatId = params.get("chatId");

    if (urlChatId) {
      setChatId(urlChatId);
    }
  }, []);

  // Add first message when component mounts
  useEffect(() => {
    //todo: get initial message from backend
    if (messages.length === 0) {
      const initialMessage = {
        id: 1,
        text: "Hey! 👋\n\nIk ben de assistent van Professor Dog. Ik zal proberen je te helpen met je hondenvraag.\n\nAls ik het antwoord niet weet, zal ik het doorsturen naar Professor Dog.\n\nWat is het probleem van jouw hond?",
        sender: "assistant",
      };

      setMessages([initialMessage]);
      setCurrentTypingMessage(initialMessage);
    }
  }, [messages.length]);

  useEffect(() => {
    if (chatId) {
      const url = new URL(window.location);
      url.searchParams.set("chatId", chatId);
      window.history.pushState({}, "", url);
    }
  }, [chatId]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message immediately
    const userMessage = {
      id: Date.now(),
      text,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      // Send message and get a messageId for polling
      const messageInit = await chatService.sendMessage(text, chatId || null);
      const newChatId = messageInit.chatId;

      if (newChatId) {
        setChatId(newChatId);
      }

      // Start polling
      const pollInterval = setInterval(async () => {
        const status = await chatService.checkMessageStatus(newChatId);

        if (status.complete) {
          clearInterval(pollInterval);
          const assistantMessage = {
            id: Date.now(),
            text: status.message,
            sender: "assistant",
          };

          setMessages((prev) => [...prev, assistantMessage]);
          setCurrentTypingMessage(assistantMessage);
          setIsTypingComplete(true);
          setIsLoading(false);
        }
      }, 2000);

      return () => clearInterval(pollInterval);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  const completeTyping = () => {
    setIsTypingComplete(true);
    setCurrentTypingMessage(null);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        currentTypingMessage,
        isTypingComplete,
        sendMessage,
        completeTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
