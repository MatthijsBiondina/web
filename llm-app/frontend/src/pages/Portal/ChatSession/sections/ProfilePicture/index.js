// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";

// Image
import bgImage from "assets/images/conversation/profile-picture.jpg";

function ProfilePicture() {
  return (
    <Grid item xs={12} lg={6}>
      <MKBox
        display={{ xs: "none", lg: "flex" }}
        width="calc(100% - 2rem)"
        height="calc(100vh - 2rem)"
        borderRadius="lg"
        ml={2}
        mt={2}
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
