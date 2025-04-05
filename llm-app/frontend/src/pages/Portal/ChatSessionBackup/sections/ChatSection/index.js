import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import CircularProgress from "@mui/material/CircularProgress";
import MKTypography from "components/MKTypography";
import { ChatProvider, useChat } from "../../contexts/ChatContext";
import TypingMessage from "../../components/TypingMessage";
import MessageContainer from "../../components/MessageContainer";
import MessageInput from "../../components/MessageInput";
import MessageAndSubjectInput from "../../components/MessageAndSubjectInput";

function ChatSectionContent() {
  const {
    currentTypingMessage,
    isTypingComplete,
    completeTyping,
    isLoading,
    isLoadingHistory,
    subject,
    isFirstMessage,
  } = useChat();

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
      {/* Chat subject (if it exists) */}
      {subject && (
        <MKBox
          bgColor="white"
          borderRadius="xl"
          shadow="lg"
          p={3}
          mb={2}
          mx={3}
          mt={{ xs: 20, sm: 18, md: 20 }}
        >
          <MKTypography variant="h5" fontWeight="bold">
            {subject}
          </MKTypography>
        </MKBox>
      )}

      {/* Loading History Indicator */}
      {isLoadingHistory ? (
        <MKBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          my={8}
          height="50vh"
        >
          <CircularProgress />
          <MKTypography variant="body" mt={2}>
            Conversatie laden...
          </MKTypography>
        </MKBox>
      ) : (
        <>
          {/* Previous messages */}
          <MessageContainer />

          {/* Current typing message */}
          {currentTypingMessage && (
            <MKBox
              bgColor="light.state"
              borderRadius="xl"
              p={3}
              mb={{ xs: 5, sm: 4, md: 5 }}
              mx={3}
            >
              <TypingMessage message={currentTypingMessage} onComplete={completeTyping} />
            </MKBox>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <MKBox display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </MKBox>
          )}

          {/* Message Input - First message with subject field or regular input */}
          {isTypingComplete &&
            !isLoading &&
            (isFirstMessage ? <MessageAndSubjectInput /> : <MessageInput />)}
        </>
      )}
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
