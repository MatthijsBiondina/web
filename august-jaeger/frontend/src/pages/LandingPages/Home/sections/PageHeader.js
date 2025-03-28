import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// typed-js
import Typed from "typed.js";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Images
import bgImage from "assets/images/bg-home.jpg";

function PageHeader() {
  const navigate = useNavigate();

  const handleNavigation = (path, e) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <MKBox component="header" position="relative">
      <MKBox component="nav" position="absolute" top="0.5rem" width="100%">
        <Container>
          <Grid container flexDirection="row" alignItems="center">
            <MKTypography
              component={Link}
              href="#"
              variant="button"
              color="white"
              fontWeight="regular"
              py={0.8125}
              mr={2}
            >
              <strong>August-Jaeger</strong>
            </MKTypography>
            <MKButton
              variant="outlined"
              color="white"
              sx={{ display: { xs: "block", lg: "none" }, ml: "auto" }}
            >
              <MKBox component="i" color="white" className="fas fa-bars" />
            </MKButton>
            <MKBox
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              my={0}
              mx="auto"
              sx={{ listStyle: "none" }}
            >
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="/home"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  p={1}
                  onClick={(e) => handleNavigation("/home", e)}
                >
                  <strong>Home</strong>
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="/about"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  p={1}
                  onClick={(e) => handleNavigation("/about", e)}
                >
                  <strong>About</strong>
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="/contact"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  p={1}
                  onClick={(e) => handleNavigation("/contact", e)}
                >
                  <strong>Contact</strong>
                </MKTypography>
              </MKBox>
            </MKBox>
            <MKBox
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              m={0}
              sx={{ listStyle: "none" }}
            >
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <MKBox component="i" color="white" className="fab fa-twitter" />
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <MKBox component="i" color="white" className="fab fa-facebook" />
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <MKBox component="i" color="white" className="fab fa-instagram" />
                </MKTypography>
              </MKBox>
            </MKBox>
          </Grid>
        </Container>
      </MKBox>
      <MKBox
        display="flex"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.5),
              rgba(gradients.dark.state, 0.5)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            mx="auto"
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
              Don&apos;t Let Career Stagnation Hold You Back
            </MKTypography>
            <MKTypography variant="body1" color="white" mt={1} mb={6} px={{ xs: 3, lg: 6 }}>
              Are you facing unfulfilling job opportunities?
            </MKTypography>
            <MKButton
              href="https://calendly.com/adavies-2/august-jaeger-free-20-minute-consultation"
              color="white"
            >
              Book A Call Here
            </MKButton>
          </Grid>
        </Container>
      </MKBox>
    </MKBox>
  );
}

export default PageHeader;
