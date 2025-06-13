import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import PropTypes from "prop-types";
import MessageList from "./MessageList";
import UserInput from "./UserInput";
function ExistingChat({ chatId }) {
  return (
    <Grid
      item
      xs={12}
      sm={10}
      md={7}
      lg={6}
      xl={4}
      ml={{ xs: "auto", xl: 6 }}
      mr={{ xs: "auto", xl: 6 }}
      sx={{
        minHeight: "100vh",
        display: "flex", // Add display flex
        flexDirection: "column", // Add flex direction
      }}
    >
      <MKBox mt="auto">
        <MessageList chatId={chatId} />
        <UserInput chatId={chatId} />
      </MKBox>
    </Grid>
  );
}

ExistingChat.propTypes = {
  chatId: PropTypes.string.isRequired,
};

export default ExistingChat;
