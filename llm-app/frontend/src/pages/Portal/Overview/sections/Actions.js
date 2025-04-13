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

// Material Kit 2 PRO React components
import SimpleBookingCard from "examples/Cards/BookingCards/SimpleBookingCard";

// Images
import product1 from "assets/images/portal-actions/new-question.jpg";
import product2 from "assets/images/portal-actions/old-question.jpg";
import product3 from "assets/images/portal-actions/manage-account.jpg";
import { useNavigate } from "react-router-dom";

function Actions() {
  const actionProps = {
    type: "internal",
    route: "/portaal/chat-sessie",
    color: "info",
    label: "Chat",
  };

  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6} lg={4}>
            <MKBox mt={3}>
              <SimpleBookingCard
                image={product1}
                title="Nieuwe vraag"
                description="Lorum Ipsum"
                action={actionProps}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MKBox mt={3}>
              <SimpleBookingCard
                image={product2}
                title="Gesprekken teruglezen"
                description="Lorum ipsum"
                action={actionProps}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MKBox mt={3}>
              <SimpleBookingCard
                image={product3}
                title="Account beheren"
                description="Lorum ipsum"
                action={actionProps}
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Actions;
