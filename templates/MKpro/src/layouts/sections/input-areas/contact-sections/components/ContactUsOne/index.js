/**
=========================================================
* Material Kit 2 PRO React - v2.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

function ContactUsOne() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid
          container
          item
          justifyContent="center"
          xs={10}
          lg={7}
          mx="auto"
          mb={{ xs: 0, md: 6 }}
          textAlign="center"
        >
          <MKTypography variant="h3" mb={1}>
            Contact Us
          </MKTypography>
          <MKTypography variant="body2" color="text">
            For further questions, including partnership opportunities, please email
            hello@creative-tim.com or contact using our contact form.
          </MKTypography>
        </Grid>
        <Grid container item xs={12} lg={8} sx={{ mx: "auto" }}>
          <MKBox width="100%" component="form" method="post" autoComplete="off">
            <MKBox p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <MKInput label="Full Name" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MKInput type="email" label="Email" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <MKInput label="What can we help you?" multiline fullWidth rows={6} />
                </Grid>
              </Grid>
              <Grid container item justifyContent="center" xs={12} my={6}>
                <MKButton type="submit" variant="gradient" color="info">
                  Send Message
                </MKButton>
              </Grid>
            </MKBox>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default ContactUsOne;
