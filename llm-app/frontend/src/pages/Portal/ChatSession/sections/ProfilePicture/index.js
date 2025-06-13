// @mui material components
import Grid from "@mui/material/Grid";
// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
// Image
import bgImage from "assets/images/conversation/profile-picture.jpg";

function ProfilePicture() {
  return (
    <Grid
      display={{ xs: "none", xl: "flex" }}
      item
      xs={12}
      lg={6}
      sx={{
        position: "sticky",
        top: "1rem",
        alignSelf: "flex-start", // Override the parent's alignItems="center"
        height: "fit-content",
      }}
    >
      <MKBox
        display={{ xs: "none", xl: "flex" }}
        width="calc(100% - 2rem)"
        height="calc(100vh - 2rem)"
        borderRadius="lg"
        ml={2}
        mt={-3} // I don't know why -3 is needed to align the image with the text
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
    </Grid>
  );
}

export default ProfilePicture;
