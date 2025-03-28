// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 PRO React examples
import SimpleInfoCard from "examples/Cards/InfoCards/SimpleInfoCard";

function ScheduleMeeting() {
  // Define the Calendly URLs for each service
  const calendlyLinks = {
    coaching: "https://calendly.com/aaron-augustjaeger/one-off-coaching-session",
    interview:
      "https://calendly.com/aaron-augustjaeger/comprehensive-interview-preparation-session",
    linkedin: "https://calendly.com/aaron-augustjaeger/linkedin-profile-optimisation",
    resume: "https://calendly.com/aaron-augustjaeger/resume-optimisation",
  };

  // Function to handle redirecting to Calendly
  const handleRedirect = (url) => {
    window.open(url, "_blank");
  };

  // Create a styled wrapper for the SimpleInfoCard
  const StyledCardWrapper = styled(MKBox)(({ theme }) => ({
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    borderRadius: theme.functions.pxToRem(16),
    overflow: "hidden",
    padding: theme.spacing(3),
    margin: theme.spacing(1),
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: theme.boxShadows.xxl,
    },
  }));

  // Custom styled card component that wraps SimpleInfoCard to make it clickable
  const ClickableInfoCard = ({ icon, title, description, calendlyUrl }) => (
    <StyledCardWrapper onClick={() => handleRedirect(calendlyUrl)}>
      <SimpleInfoCard icon={icon} title={title} description={description} />
    </StyledCardWrapper>
  );

  return (
    <MKBox component="section" py={{ xs: 6, md: 12 }}>
      <Container>
        <Grid
          container
          item
          justifyContent="center"
          xs={12}
          lg={6}
          sx={{ mx: "auto", pb: 3, textAlign: "center" }}
        >
          <MKTypography variant="h2" my={1}>
            Ready to move ahead?
          </MKTypography>
          <MKTypography variant="body1" color="text">
            Please select the appropriate service you require below and choose a convenient slot.
          </MKTypography>
        </Grid>

        <Grid container item xs={12} mt={4} justifyContent="center">
          <Grid
            item
            xs={12}
            md={4}
            sx={{ ml: { xs: 0, md: "auto" }, mr: { xs: 0, md: 6 }, mb: { xs: 4, md: 0 } }}
          >
            <Stack spacing={{ xs: 4, md: 8 }}>
              <ClickableInfoCard
                icon="school"
                title="One off coaching session"
                description="45 minutes"
                calendlyUrl={calendlyLinks.coaching}
              />
              <ClickableInfoCard
                icon="assignment"
                title="Comprehensive interview preparation session"
                description="1 hour"
                calendlyUrl={calendlyLinks.interview}
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ mr: { xs: 0, md: "auto" }, ml: { xs: 0, md: 6 }, mb: { xs: 4, md: 0 } }}
          >
            <Stack spacing={{ xs: 4, md: 8 }}>
              <ClickableInfoCard
                icon="account_circle"
                title="LinkedIn profile optimisation"
                description="30 minutes"
                calendlyUrl={calendlyLinks.linkedin}
              />
              <ClickableInfoCard
                icon="description"
                title="Resume/CV optimisation"
                description="30 minutes"
                calendlyUrl={calendlyLinks.resume}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default ScheduleMeeting;
