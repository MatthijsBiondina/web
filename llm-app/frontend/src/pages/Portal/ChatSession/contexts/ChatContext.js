import { createContext, useContext, useState } from "react";
import {
  useCreateChat,
  useRetrieveMessages,
  useWaitForChatbotResponse,
  useSendMessage,
  useRetrieveEmailSentStatus,
} from "../hooks/useChatService";
import PropTypes from "prop-types";
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailRequested, setEmailRequested] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { createChat: createChatService } = useCreateChat();
  const { sendMessage: sendMessageService } = useSendMessage();
  const { retrieveMessages: retrieveMessagesService } = useRetrieveMessages();
  const { waitForChatbotResponse: waitForChatbotResponseService } = useWaitForChatbotResponse();
  const { retrieveEmailSentStatus: retrieveEmailSentStatusService } = useRetrieveEmailSentStatus();

  const createChat = async (subject, text) => {
    if (!subject.trim() || !text.trim()) return;

    const chat = await createChatService(subject, text);

    return chat.chatId;
  };

  const sendMessage = async (message, chatId) => {
    setLoading(true);

    if (!chatId || !message.trim()) return;
    const response = await sendMessageService(message, chatId);

    return response.userMessageId;
  };

  const retrieveMessages = async (chatId) => {
    if (!chatId) return;
    const messages = await retrieveMessagesService(chatId);
    setMessages(messages);

    return messages;
  };

  const retrieveEmailSentStatus = async (chatId) => {
    if (!chatId) return;
    const emailSentStatus = await retrieveEmailSentStatusService(chatId);
    setEmailSent(emailSentStatus);
    return emailSentStatus;
  };

  const waitForChatbotResponse = async (chatId) => {
    if (!chatId) return;
    setLoading(true);
    const message = await waitForChatbotResponseService(chatId);
    setMessages((prevMessages) => [...prevMessages, message]);
    setLoading(false);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        createChat,
        retrieveMessages,
        retrieveEmailSentStatus,
        waitForChatbotResponse,
        sendMessage,
        loading,
        emailRequested,
        setEmailRequested,
        emailSent,
        setEmailSent,
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
