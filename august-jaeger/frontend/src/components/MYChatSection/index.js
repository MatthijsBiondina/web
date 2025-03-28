// @mui material components
import Grid from "@mui/material/Grid";
import { useState, useEffect, useRef } from "react";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

function ChatSection() {
  const fullMessage =
    "Hey! 👋\n\nIk ben de assistent van Professor Dog. Ik zal proberen je te helpen met je hondenvraag.\n\nAls ik het antwoord niet weet, zal ik het doorsturen naar Professor Dog.\n\nWat is het probleem van jouw hond?";

  const [displayedText, setDisplayedText] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [typingSpeed] = useState(1); // milliseconds per character
  const charIndex = useRef(0);

  useEffect(() => {
    if (charIndex.current < fullMessage.length) {
      const typingTimer = setTimeout(() => {
        setDisplayedText(fullMessage.substring(0, charIndex.current + 1));
        charIndex.current += 1;
      }, typingSpeed);

      return () => clearTimeout(typingTimer);
    } else {
      // setIsTypingComplete(true);
      // Add a slight delay before showing the message box
      setTimeout(() => {
        setShowMessageBox(true);
      }, 500);
    }
  }, [displayedText, fullMessage, typingSpeed]);

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
    >
      <MKBox
        bgColor="light.state"
        borderRadius="xl"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        mt={{ xs: 20, sm: 18, md: 20 }}
        mb={{ xs: 5, sm: 4, md: 5 }}
        mx={3}
      >
        <MKBox p={3}>
          <MKTypography variant="h6" style={{ whiteSpace: "pre-line" }}>
            {displayedText}
          </MKTypography>
        </MKBox>
      </MKBox>

      {/* Message box is always in the DOM but visibility is controlled */}
      <MKBox
        bgColor="white"
        borderRadius="xl"
        shadow="lg"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        mt={{ xs: 5, sm: 4, md: 5 }}
        mb={{ xs: 20, sm: 18, md: 20 }}
        mx={3}
        sx={{
          opacity: showMessageBox ? 1 : 0,
          visibility: showMessageBox ? "visible" : "hidden",
          transition: "opacity 0.8s ease, visibility 0.8s",
          // Reserve the space even when hidden
          height: showMessageBox ? "auto" : "232px", // Approximate height of the form
        }}
      >
        <MKBox p={3}>
          <MKBox width="100%" component="form" method="post" autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MKInput
                  variant="standard"
                  placeholder="Beschrijf je vraag in ten minste 250 karakters"
                  InputLabelProps={{ shrink: true }}
                  multiline
                  fullWidth
                  rows={6}
                />
              </Grid>
            </Grid>
            <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
              <MKButton type="submit" variant="gradient" color="info">
                Versturen
              </MKButton>
            </Grid>
          </MKBox>
        </MKBox>
      </MKBox>
    </Grid>
  );
}

export default ChatSection;
