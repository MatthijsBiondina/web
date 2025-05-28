import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import PropTypes from "prop-types";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import { useChat } from "../../contexts/ChatContext";
import { useEffect, useState } from "react";
import RequestEmailForm from "./RequestEmailForm";
import CheckContactDetailsForm from "./CheckContactDetailsForm";
function ExistingChat({ chatId }) {
  const { messages, emailRequested, setEmailRequested } = useChat();

  const [showRequestEmailPrompt, setShowRequestEmailPrompt] = useState(false);
  const [showCheckContactDetailsPrompt, setShowCheckContactDetailsPrompt] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      console.log("lastMessage", lastMessage);
      if (lastMessage.sender === "assistant" && lastMessage.status === "success") {
        setEmailRequested(false);
        setShowRequestEmailPrompt(false);
      } else if (lastMessage.sender === "assistant" && lastMessage.status === "failed") {
        setShowRequestEmailPrompt(true);
      }
    }
  }, [messages]);

  const handleRequestEmail = (e) => {
    e.preventDefault();
    setEmailRequested(true);
    setShowRequestEmailPrompt(false);
    setShowCheckContactDetailsPrompt(true);
  };

  const rejectRequestEmail = (e) => {
    e.preventDefault();
    setEmailRequested(false);
    setShowRequestEmailPrompt(false);
  };

  const handleAskProfessor = (e) => {
    e.preventDefault();
    setShowCheckContactDetailsPrompt(true);
  };

  const handleRejectAskProfessor = (e) => {
    e.preventDefault();
    setShowCheckContactDetailsPrompt(false);
    setShowRequestEmailPrompt(true);
  };

  return (
    <Grid
      item
      xs={12}
      sm={10}
      md={7}
      lg={6}
      xl={4}
      ml={{ xs: "auto", lg: 6 }}
      mr={{ xs: "auto", lg: 6 }}
      sx={{
        minHeight: "100vh",
        display: "flex", // Add display flex
        flexDirection: "column", // Add flex direction
      }}
    >
      <MKBox mt="auto">
        <MessageList chatId={chatId} />
        {showRequestEmailPrompt ? (
          <RequestEmailForm
            chatId={chatId}
            handleRequestEmail={handleRequestEmail}
            rejectRequestEmail={rejectRequestEmail}
          />
        ) : (
          <>
            {showCheckContactDetailsPrompt ? (
              <CheckContactDetailsForm
                handleAskProfessor={handleAskProfessor}
                handleRejectAskProfessor={handleRejectAskProfessor}
              />
            ) : (
              <MessageForm chatId={chatId} />
            )}
          </>
        )}
      </MKBox>
    </Grid>
  );
}

ExistingChat.propTypes = {
  chatId: PropTypes.string.isRequired,
};

export default ExistingChat;
