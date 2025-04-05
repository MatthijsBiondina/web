import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";
import { TypeAnimation } from "react-type-animation";

function TypingMessage({ message, typingSpeed = 90 }) {
  // If message is null or undefined, render nothing
  if (!message) return null;

  // Get the text content from the message, ensuring it's a string
  // and handling any potential undefined values
  const text = message || "";

  return (
    <MKTypography variant="body2" style={{ whiteSpace: "pre-line" }}>
      <TypeAnimation
        sequence={[text, 1000]} // Adding a pause after text completes
        wrapper="span"
        speed={typingSpeed}
        cursor={false}
        repeat={0}
        style={{ display: "inline-block" }}
      />
    </MKTypography>
  );
}

export default TypingMessage;

TypingMessage.propTypes = {
  message: PropTypes.string,
  typingSpeed: PropTypes.number,
};
