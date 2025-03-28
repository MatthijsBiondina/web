// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// React Router
import { useNavigate } from "react-router-dom";

// Images
import bgImage from "assets/images/bg-empty.jpg";

function Cta() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/about");
  };

  return (
    <MKBox
      display="flex"
      mb={24}
      py={6}
      sx={{
        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
          `${linearGradient(
            rgba(gradients.dark.main, 0.8),
            rgba(gradients.dark.state, 0.8)
          )}, url(${bgImage})`,
      }}
    >
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8} lg={5}>
            <MKTypography variant="h5" color="white" fontWeight="bold">
              Together, we&apos;ll build the tools and confidence you need to achieve your career
              goals
            </MKTypography>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ ml: "auto" }}>
            <MKBox width="12rem" ml="auto">
              <MKButton
                onClick={handleNavigation}
                variant="gradient"
                color="info"
                fullWidth
                sx={{ boxShadow: "none" }}
              >
                Learn More
              </MKButton>
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Cta;
