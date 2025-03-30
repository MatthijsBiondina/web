import { useState } from "react";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import { useChat } from "../contexts/ChatContext";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
function MessageInput() {
  const [message, setMessage] = useState("");
  const { sendMessage, isLoading } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <MKBox
      bgColor="white"
      borderRadius="xl"
      shadow="lg"
      p={3}
      mb={{ xs: 20, sm: 18, md: 20 }}
      mx={3}
    >
      <MKBox width="100%" component="form" onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MKInput
              variant="standard"
              placeholder="Beschrijf je vraag in ten minste 250 karakters"
              InputLabelProps={{ shrink: true }}
              multiline
              fullWidth
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
            />
          </Grid>
        </Grid>
        <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
          <MKButton
            type="submit"
            variant="gradient"
            color="info"
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? <CircularProgress size={20} /> : "Versturen"}
          </MKButton>
        </Grid>
      </MKBox>
    </MKBox>
  );
}

export default MessageInput;

MessageInput.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
