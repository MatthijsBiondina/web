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
          sx={{ mx: "auto", textAlign: "center" }}
        >
          <MKTypography
            variant="h2"
            color="white"
            sx={({ breakpoints, typography: { size } }) => ({
              [breakpoints.down("md")]: {
                fontSize: size["3xl"],
              },
            })}
          >
            Admin Dashboard..........
          </MKTypography>
          <MKTypography variant="body1" color="white" mt={1}>
            Alleen admins kunnen toegang krijgen tot deze pagina.
          </MKTypography>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default PageHeader;
