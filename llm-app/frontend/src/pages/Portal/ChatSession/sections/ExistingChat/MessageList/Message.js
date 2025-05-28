import MKBox from "components/MKBox";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import Grid from "@mui/material/Grid";

function Message({ message, sender }) {
  // Split the message text by newlines and create an array of text segments
  const textSegments = message.split("\n");

  return (
    <Grid container spacing={2} sx={{ marginTop: 0, marginBottom: 0 }}>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: sender === "assistant" ? "flex-start" : "flex-end" }}
      >
        <MKBox
          maxWidth="95%"
          bgColor={sender === "assistant" ? "white" : "info"}
          borderRadius="xl"
          shadow="md"
          sx={{
            padding: 0,
            position: "relative",
            overflow: "hidden",
            border: sender === "assistant" ? "1px solid #e0e0e0" : "none",
          }}
        >
          <MKBox px={3} py={2}>
            <Typography
              variant="body2"
              color={sender === "assistant" ? "dark" : "grey.400"}
              sx={{ fontWeight: sender === "user" ? "normal" : "normal" }}
            >
              {textSegments.map((segment, index) => (
                <React.Fragment key={index}>
                  {segment}
                  {index < textSegments.length - 1 && <br />}
                </React.Fragment>
              ))}
            </Typography>
          </MKBox>
        </MKBox>
      </Grid>
    </Grid>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
};

export default Message;
