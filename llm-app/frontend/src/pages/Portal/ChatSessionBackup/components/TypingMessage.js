import { useState, useEffect, useRef } from "react";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";

function TypingMessage({ message, onComplete, typingSpeed = 1 }) {
  const [displayedText, setDisplayedText] = useState("");
  const charIndex = useRef(0);
  const fullText = message?.text || "";

  useEffect(() => {
    // Reset when a new message comes in
    if (message) {
      charIndex.current = 0;
      setDisplayedText("");
    }
  }, [message]);

  useEffect(() => {
    if (!message) return;

    if (charIndex.current < fullText.length) {
      const typingTimer = setTimeout(() => {
        setDisplayedText(fullText.substring(0, charIndex.current + 1));
        charIndex.current += 1;
      }, typingSpeed);

      return () => clearTimeout(typingTimer);
    } else {
      // Typing is complete
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  }, [displayedText, fullText, message, onComplete, typingSpeed]);

  if (!message) return null;

  return (
    <MKTypography variant="h6" style={{ whiteSpace: "pre-line" }}>
      {displayedText}
    </MKTypography>
  );
}

export default TypingMessage;

TypingMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }),
  onComplete: PropTypes.func.isRequired,
  typingSpeed: PropTypes.number,
};

TypingMessage.defaultProps = {
  typingSpeed: 1,
};
