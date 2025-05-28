import { useChat } from "../../contexts/ChatContext";
import { useState } from "react";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import Grid from "@mui/material/Grid";
import MKButton from "components/MKButton";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

function MessageForm({ chatId }) {
  const { sendMessage, messages, setMessages, loading } = useChat();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessageId = await sendMessage(message, chatId);
    setMessages([...messages, { id: userMessageId, text: message, sender: "user" }]);
    setMessage("");
  };

  return (
    <MKBox width="100%" bgColor="white" borderRadius="xl" shadow="lg" p={3} sx={{ marginTop: 3 }}>
      <MKBox width="100%" component="form" onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MKInput
              variant="standard"
              InputLabelProps={{ shrink: true }}
              multiline
              fullWidth
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
          <MKButton
            type="submit"
            variant="gradient"
            color="info"
            disabled={!message.trim() || loading}
            sx={{ width: "120px" }}
          >
            {loading ? <CircularProgress size={20} /> : "Versturen"}
          </MKButton>
        </Grid>
      </MKBox>
    </MKBox>
  );
}

MessageForm.propTypes = {
  chatId: PropTypes.string.isRequired,
};

export default MessageForm;
