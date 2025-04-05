import { useState } from "react";

import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import Grid from "@mui/material/Grid";

function NewMessageForm() {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && subject.trim()) {
      setMessage("");
      setSubject("");
    }
  };

  return (
    <MKBox width="100%" bgColor="white" borderRadius="xl" shadow="lg" p={3}>
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
            />
          </Grid>
        </Grid>
        <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
          <MKButton
            type="submit"
            variant="gradient"
            color="info"
            disabled={!message.trim() || !subject.trim()}
            onClick={handleSubmit}
          >
            {"Versturen"}
          </MKButton>
        </Grid>
      </MKBox>
    </MKBox>
  );
}

export default NewMessageForm;
