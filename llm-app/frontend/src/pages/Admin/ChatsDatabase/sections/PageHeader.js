import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import bgImage from "assets/images/bg-admin.jpg";

function PageHeader() {
  return (
    <MKBox
      minHeight="50vh"
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
          lg={8}
          justifyContent="center"
          flexDirection="column" // Add this to ensure vertical stacking
          sx={{ mx: "auto", textAlign: "center" }}
        >
          <MKTypography
            variant="h2"
            color="white"
            sx={({ breakpoints, typography: { size } }) => ({
              [breakpoints.down("md")]: {
                fontSize: size["3xl"],
              },
              display: "block", // Ensure block-level behavior
              width: "100%", // Take full width of parent
            })}
          >
            Chats Database
          </MKTypography>
          <MKTypography
            variant="body1"
            color="white"
            mt={1}
            sx={{
              display: "block", // Ensure block-level behavior
              width: "100%", // Take full width of parent
            }}
          >
            Bekijk en beheer alle chats
          </MKTypography>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default PageHeader;
