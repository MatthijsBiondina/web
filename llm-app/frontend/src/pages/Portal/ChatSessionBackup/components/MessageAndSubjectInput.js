import { useState } from "react";
import { useChat } from "../contexts/ChatContext";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

function MessageAndSubjectInput() {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const { sendMessage, isLoading } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && subject.trim() && !isLoading) {
      sendMessage(message, subject);
      setMessage("");
      setSubject("");
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
              label="Onderwerp"
              placeholder="Voer een onderwerp in voor deze conversatie"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isLoading}
            />
          </Grid>
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
            disabled={isLoading || !message.trim() || !subject.trim()}
          >
            {isLoading ? <CircularProgress size={20} /> : "Versturen"}
          </MKButton>
        </Grid>
      </MKBox>
    </MKBox>
  );
}

export default MessageAndSubjectInput;

MessageAndSubjectInput.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
