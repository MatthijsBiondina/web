import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import NewMessageForm from "./NewMessageForm";
import WelcomeMessage from "./WelcomeMessage";
function NewChat() {
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
        <WelcomeMessage />
        <NewMessageForm />
      </MKBox>
    </Grid>
  );
}

export default NewChat;
