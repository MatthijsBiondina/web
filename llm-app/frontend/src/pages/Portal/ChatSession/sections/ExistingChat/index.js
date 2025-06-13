import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import PropTypes from "prop-types";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import { useChat } from "../../contexts/ChatContext";
import useAskProfessor from "../../hooks/useEmailService";
import { useEffect, useState } from "react";
import RequestEmailForm from "./RequestEmailForm";
import CheckContactDetailsForm from "./CheckContactDetailsForm";
import ConfirmEmailSent from "./ConfirmEmailSent";
import UserInput from "./UserInput";
function ExistingChat({ chatId }) {
  const { messages, emailRequested, setEmailRequested, retrieveEmailSentStatus } = useChat();

  const {
    askProfessor,
    loading: askProfessorLoading,
    error: askProfessorError,
  } = useAskProfessor();

  const [showRequestEmailPrompt, setShowRequestEmailPrompt] = useState(false);
  const [showCheckContactDetailsPrompt, setShowCheckContactDetailsPrompt] = useState(false);

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
        <UserInput chatId={chatId} />
      </MKBox>
    </Grid>
  );
}

ExistingChat.propTypes = {
  chatId: PropTypes.string.isRequired,
};

export default ExistingChat;
