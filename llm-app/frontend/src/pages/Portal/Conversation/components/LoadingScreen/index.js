// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingScreen() {
  return (
    <MKBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
    >
      <CircularProgress color="info" />
      <MKBox mt={2}>Loading...</MKBox>
    </MKBox>
  );
}

export default LoadingScreen;
