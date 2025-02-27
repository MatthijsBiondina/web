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
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { useRef } from "react";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Material Kit 2 PRO React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Coworking page sections
import Information from "pages/LandingPages/Coworking/sections/Information";
import Testimonials from "pages/LandingPages/Coworking/sections/Testimonials";
import AboutUs from "pages/LandingPages/Coworking/sections/AboutUs";
import Places from "pages/LandingPages/Coworking/sections/Places";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/bg-home.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const scrollToContent = () => {
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "internal",
          route: "/portaal",
          label: "portaal",
          color: "info",
        }}
        sticky
      />

      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.5),
              rgba(gradients.dark.state, 0.5)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            md={7}
            justifyContent={{ xs: "center", md: "start" }}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Woef
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              mt={1}
              pr={{ md: 12, lg: 24, xl: 32 }}
              opacity={0.8}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </MKTypography>
            <Stack direction="row" spacing={1} mt={6} mb={3}>
              <MKButton variant="gradient" color="info" onClick={() => navigate("/portaal")}>
                probeer nu
              </MKButton>
              <MKButton variant="text" color="white" onClick={scrollToContent}>
                lees meer
              </MKButton>
            </Stack>
          </Grid>
        </Container>
      </MKBox>
      {/* Component below header must contain ref={contentRef} */}
      <Card
        ref={contentRef}
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Information />
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Home;
