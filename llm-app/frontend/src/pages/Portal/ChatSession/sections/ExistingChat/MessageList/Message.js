import MKBox from "components/MKBox";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
function Message({ message, sender }) {
  // Split the message text by newlines and create an array of text segments
  const textSegments = message.split("\n");

  return (
    <MKBox my={6}>
      {sender === "assistant" ? (
        <MKBox ml={-1} mr={1}>
          <Typography variant="body2" color="dark">
            {/* Map through segments and add breaks between them */}
            {textSegments.map((segment, index) => (
              // Use React fragments with keys for list items
              <React.Fragment key={index}>
                {segment}
                {/* Add line break for all but the last segment */}
                {index < textSegments.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Typography>
        </MKBox>
      ) : (
        <MKBox ml={1} mr={-1} textAlign="right">
          <Typography variant="body2" color="dark" sx={{ fontStyle: "italic" }}>
            {/* Map through segments and add breaks between them */}
            {textSegments.map((segment, index) => (
              // Use React fragments with keys for list items
              <React.Fragment key={index}>
                {segment}
                {/* Add line break for all but the last segment */}
                {index < textSegments.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Typography>
        </MKBox>
      )}
    </MKBox>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
};

export default Message;
