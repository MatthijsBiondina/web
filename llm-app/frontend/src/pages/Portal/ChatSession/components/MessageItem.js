import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";
function MessageItem({ message }) {
  const isAssistant = message.sender === "assistant";

  return (
    <MKBox
      bgcolor={isAssistant ? "light.state" : "white"}
      shadow={isAssistant ? "none" : "lg"}
      borderRadius="xl"
      p={3}
      mb={2}
      mx={3}
      justifyContent={isAssistant ? "flex-start" : "flex-end"}
    >
      <MKTypography variant="h6" style={{ whiteSpace: "pre-line" }}>
        {message.text}
      </MKTypography>
    </MKBox>
  );
}

export default MessageItem;

MessageItem.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
  }).isRequired,
};
