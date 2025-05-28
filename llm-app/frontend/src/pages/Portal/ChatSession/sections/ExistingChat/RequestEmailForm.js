import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MKButton from "components/MKButton";
import PropTypes from "prop-types";

function RequestEmailForm({ handleRequestEmail, rejectRequestEmail }) {
  return (
    <MKBox width="100%" bgColor="white" borderRadius="xl" shadow="lg" p={3} sx={{ marginTop: 3 }}>
      <MKBox
        maxWidth="95%"
        sx={{
          padding: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="body2" color="dark" sx={{ fontWeight: "normal" }}>
            Als je wilt, zal ik je vraag doorsturen naar Professor Dog, dan geeft hij je per email
            persoonlijk antwoord. Je kunt er ook voor kiezen om het gesprek met de chatbot voort te
            zetten.
            <br />
            <br />
            Zal ik je vraag doorsturen?
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <MKButton
            variant="gradient"
            color="info"
            sx={{ width: "45%", marginRight: "5%" }}
            onClick={handleRequestEmail}
          >
            Ja, stuur mijn vraag door
          </MKButton>
          <MKButton
            variant="gradient"
            color="secondary"
            sx={{ width: "45%", marginLeft: "5%" }}
            onClick={rejectRequestEmail}
          >
            Nee, verder met de Chatbot
          </MKButton>
        </Grid>
      </MKBox>
    </MKBox>
  );
}

export default RequestEmailForm;

RequestEmailForm.propTypes = {
  handleRequestEmail: PropTypes.func.isRequired,
  rejectRequestEmail: PropTypes.func.isRequired,
};
