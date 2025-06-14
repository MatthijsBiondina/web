import image from "assets/images/portal-actions/new-question.jpg";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import useGetBalance from "pages/Portal/Overview/hooks/useCreditService";
import MKBadge from "components/MKBadge";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

function NewQuestionCard() {
  const balance = useGetBalance();

  return (
    <Card
      component={Link}
      to={balance > 0 ? "/portaal/chat-sessie" : "/portaal/eenmalige-toegang"}
      sx={{
        "&:hover": {
          transform: "scale(1.02)",
          transition: "transform 0.3s ease-in-out",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
        },
        height: "100%",
      }}
    >
      <MKBox position="relative" borderRadius="lg" mx={2} mt={-3}>
        <MKBox
          component="img"
          src={image}
          alt="New Question"
          borderRadius="lg"
          shadow="md"
          width="100%"
          position="relative"
          zIndex={1}
        />
        <MKBox
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="absolute"
          left={0}
          top={0}
          sx={{
            backgroundImage: `url(${image})`,
            transform: "scale(0.94)",
            filter: "blur(12px)",
            backgroundSize: "cover",
          }}
        />
      </MKBox>
      <MKBox p={3} mt={-2}>
        <MKTypography display="inline" variant="h5" fontWeight="bold">
          Nieuwe vraag
        </MKTypography>
        <MKTypography variant="body2" color="text">
          Begin een nieuwe sessie met onze chatbot.
        </MKTypography>
        {balance > 0 && (
          <Grid container justifyContent="center" alignItems="center" width="100%" mx="auto">
            <MKBadge badgeContent={`Tegoed: ${balance}`} color="info"></MKBadge>
          </Grid>
        )}
      </MKBox>
    </Card>
  );
}

export default NewQuestionCard;
