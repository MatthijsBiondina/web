import { useChat } from "../../../contexts/ChatContext";
import Message from "./Message";
import MKBox from "components/MKBox";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

function MessageList({ chatId }) {
  const { messages, retrieveMessages, waitForChatbotResponse } = useChat();
  const waitingForResponse = useRef(false);

  useEffect(() => {
    if (!chatId) return;

    // Initial message load
    if (messages.length === 0) {
      retrieveMessages(chatId);
    }
  }, [chatId, messages.length, retrieveMessages]);

  useEffect(() => {
    if (!chatId) return;

    // Check if the last message is from the user and we're not already waiting
    const lastMessage = messages[messages.length - 1];
    if (
      messages.length > 0 &&
      lastMessage &&
      lastMessage.sender === "user" &&
      !waitingForResponse.current
    ) {
      waitingForResponse.current = true;

      waitForChatbotResponse(chatId).finally(() => {
        waitingForResponse.current = false;
      });
    }
  }, [chatId, messages, waitForChatbotResponse]);

  return (
    <MKBox display="flex" flexDirection="column">
      {messages.map((message, index) => {
        return (
          <Message
            key={message.id || `message-${index}`}
            message={message.text || ""}
            sender={message.sender}
          />
        );
      })}
    </MKBox>
  );
}

export default MessageList;

MessageList.propTypes = {
  chatId: PropTypes.string.isRequired,
};
