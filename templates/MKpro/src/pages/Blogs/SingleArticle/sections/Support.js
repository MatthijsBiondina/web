/*
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
import Stack from "@mui/material/Stack";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKSocialButton from "components/MKSocialButton";

function Support() {
  return (
    <MKBox component="section" mt={6} py={{ xs: 0, lg: 6 }}>
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={12} lg={6} mb={{ xs: 3, lg: 0 }}>
            <MKTypography variant="h4" mb={0.5}>
              Thank you for your support!
            </MKTypography>
            <MKTypography variant="body1" color="text">
              Delivering the best products
            </MKTypography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1.5}
              flexWrap="wrap"
              justifyContent={{ xs: "flex-start", lg: "flex-end" }}
            >
              <MKSocialButton color="twitter">
                <i className="fab fa-twitter" />
                &nbsp; twitter
              </MKSocialButton>
              <MKSocialButton color="facebook">
                <i className="fab fa-facebook" />
                &nbsp; facebook
              </MKSocialButton>
              <MKSocialButton color="tumblr">
                <i className="fab fa-tumblr" />
                &nbsp; tumblr
              </MKSocialButton>
              <MKSocialButton color="dribbble">
                <i className="fab fa-dribbble" />
                &nbsp; dribbble
              </MKSocialButton>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Support;
