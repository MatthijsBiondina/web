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

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Stack from "@mui/material/Stack";
import ExplanationOption from "../../components/ExplanationOption";
function Explanation() {
  return (
    <MKBox component="section" py={{ xs: 3, md: 12 }}>
      <Container>
        <Grid container>
          <Grid item xs={12} lg={5}>
            <MKTypography variant="h3" my={1}>
              Gebruik je onze chatbot regelmatig?
            </MKTypography>
            <MKTypography variant="body2" color="text" mb={2}>
              Met een abonnement krijg je directe toegang zonder per sessie te betalen. Je
              profiteert van korting en gemak, zodat je sneller geholpen wordt.
            </MKTypography>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ ml: { xs: -2, lg: "auto" }, mt: { xs: 6, lg: 0 } }}>
            <Stack>
              <ExplanationOption icon="done" content={<>Bespaar op kosten per gesprek</>} />
              <ExplanationOption icon="done" content={<>Geen gedoe met losse betalingen</>} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Explanation;
