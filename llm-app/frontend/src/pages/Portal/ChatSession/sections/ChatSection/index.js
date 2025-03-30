import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import CircularProgress from "@mui/material/CircularProgress";
import { ChatProvider, useChat } from "../../contexts/ChatContext";
import TypingMessage from "../../components/TypingMessage";
import MessageContainer from "../../components/MessageContainer";
import MessageInput from "../../components/MessageInput";

function ChatSectionContent() {
  const { currentTypingMessage, isTypingComplete, completeTyping, isLoading } = useChat();

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
    >
      {/* Previous messages */}
      <MessageContainer />

      {/* Current typing message */}
      {currentTypingMessage && (
        <MKBox bgColor="light.state" borderRadius="xl" p={3} mb={{ xs: 5, sm: 4, md: 5 }} mx={3}>
          <TypingMessage message={currentTypingMessage} onComplete={completeTyping} />
        </MKBox>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <MKBox display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </MKBox>
      )}

      {/* Message Input */}
      {isTypingComplete && !isLoading && <MessageInput />}
    </Grid>
  );
}

function ChatSection() {
  return (
    <ChatProvider>
      <ChatSectionContent />
    </ChatProvider>
  );
}

export default ChatSection;
