import { useRef, useEffect } from "react";
import MKBox from "components/MKBox";
import MessageItem from "./MessageItem";
import { useChat } from "../contexts/ChatContext";
import PropTypes from "prop-types";
function MessageContainer() {
  const { messages, currentTypingMessage } = useChat();
  const messagesEndRef = useRef(null);

  return (
    <MKBox
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "60vh",
        overflowY: "auto",
        mt: { xs: 20, sm: 18, md: 20 },
        mb: { xs: 5, sm: 4, md: 5 },
      }}
    >
      {messages
        .filter((msg) => !currentTypingMessage || msg.id !== currentTypingMessage.id)
        .map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      <div ref={messagesEndRef} />
    </MKBox>
  );
}

export default MessageContainer;

MessageContainer.propTypes = {
  messages: PropTypes.array.isRequired,
  currentTypingMessage: PropTypes.object,
};
