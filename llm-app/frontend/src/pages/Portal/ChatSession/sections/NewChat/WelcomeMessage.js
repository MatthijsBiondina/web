import useGetWelcomeMessage from "../../hooks/useGetSetting";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import CircularProgress from "@mui/material/CircularProgress";
import { useChat } from "../../contexts/ChatContext";
import { useEffect } from "react";
import Message from "../ExistingChat/MessageList/Message";

function WelcomeMessage() {
  const { welcomeMessage, loading } = useGetWelcomeMessage();
  const { setMessages } = useChat();

  useEffect(() => {
    setMessages([{ text: welcomeMessage, sender: "assistant" }]);
  }, [welcomeMessage]);

  return (
    <MKBox mb={4}>
      <MKTypography variant="h6">
        {loading ? (
          <MKBox display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </MKBox>
        ) : (
          <Message message={welcomeMessage} sender="assistant" />
          // <TypingMessage message={welcomeMessage} />
        )}
      </MKTypography>
    </MKBox>
  );
}

export default WelcomeMessage;
