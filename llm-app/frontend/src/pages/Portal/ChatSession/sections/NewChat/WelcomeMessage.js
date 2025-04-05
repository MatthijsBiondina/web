import useGetWelcomeMessage from "../../hooks/useGetSetting";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import TypingMessage from "../../components/TypingMessage";
import CircularProgress from "@mui/material/CircularProgress";

function WelcomeMessage() {
  const { welcomeMessage, loading } = useGetWelcomeMessage();

  return (
    <MKBox mb={4}>
      <MKTypography variant="h6">
        {loading ? (
          <MKBox display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </MKBox>
        ) : (
          <TypingMessage message={welcomeMessage} />
        )}
      </MKTypography>
    </MKBox>
  );
}

export default WelcomeMessage;
