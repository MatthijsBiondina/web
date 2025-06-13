import { useState, useEffect } from "react";
import { useChat } from "../../../contexts/ChatContext";
import useAskProfessor from "../../../hooks/useEmailService";
import RequestEmailForm from "../RequestEmailForm";
import CheckContactDetailsForm from "../CheckContactDetailsForm";
import ConfirmEmailSent from "../ConfirmEmailSent";
import MessageForm from "../MessageForm";
import PropTypes from "prop-types";

function UserInput({ chatId }) {
  const {
    messages,
    emailRequested,
    setEmailRequested,
    emailSent,
    setEmailSent,
    retrieveEmailSentStatus,
  } = useChat();
  const {
    askProfessor,
    loading: askProfessorLoading,
    error: askProfessorError,
  } = useAskProfessor();
  const [showRequestEmailPrompt, setShowRequestEmailPrompt] = useState(false);
  const [showCheckContactDetailsPrompt, setShowCheckContactDetailsPrompt] = useState(false);

  useEffect(() => {
    retrieveEmailSentStatus(chatId);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
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

  const handleAskProfessor = (userName, userEmail) => {
    askProfessor(chatId, userName, userEmail);
    setEmailSent(true);
    setShowCheckContactDetailsPrompt(true);
  };

  const handleRejectAskProfessor = (e) => {
    e.preventDefault();
    setShowCheckContactDetailsPrompt(false);
    setShowRequestEmailPrompt(true);
  };

  return (
    <>
      {emailSent ? (
        <ConfirmEmailSent />
      ) : (
        <>
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
        </>
      )}
    </>
  );
}

export default UserInput;

UserInput.propTypes = {
  chatId: PropTypes.string.isRequired,
};
