import { useChat } from "../../contexts/ChatContext";
import { useState } from "react";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import Grid from "@mui/material/Grid";
import MKButton from "components/MKButton";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
function ConfirmEmailSent() {
  const { loading } = useChat();
  const navigate = useNavigate();

  return (
    <MKBox width="100%" bgColor="white" borderRadius="xl" shadow="lg" p={3} sx={{ marginTop: 3 }}>
      <MKBox width="100%">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">
              Ik heb je vraag doorgestuurd naar Professor Dog. Hij geeft je zo snel mogelijk per
              email antwoord. Hou je inbox in de gaten.
            </Typography>
          </Grid>
        </Grid>
        <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
          <MKButton
            type="submit"
            variant="gradient"
            color="secondary"
            disabled={loading}
            sx={{ width: "220px" }}
            onClick={() => navigate("/portaal")}
          >
            {loading ? <CircularProgress size={20} /> : "Terug naar overzicht"}
          </MKButton>
        </Grid>
      </MKBox>
    </MKBox>
  );
}

ConfirmEmailSent.propTypes = {
  chatId: PropTypes.string.isRequired,
};

export default ConfirmEmailSent;
