// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Coworking page component
import AboutUsOption from "../components/AboutUsOption";

function ContactDetails() {
  return (
    <MKBox component="section" py={{ xs: 3, md: 12 }}>
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={12} lg={5}>
            <MKTypography variant="h3" my={1}>
              Get in touch
            </MKTypography>
            <MKTypography variant="body2" color="text" mb={2}>
              We would love to hear from you. Feel free to reach out to us via email or phone.
            </MKTypography>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ ml: { xs: -2, lg: "auto" }, mt: { xs: 6, lg: 0 } }}>
            <Stack>
              <AboutUsOption
                icon="location_on"
                content={
                  <>
                    Located in the UK
                    <br />
                    Serving clients globally
                  </>
                }
              />
              <AboutUsOption icon="email" content={<>adavies@jurupa.co</>} />
              <AboutUsOption icon="phone" content={<>+44 7931 415397</>} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default ContactDetails;
