import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import MKTypography from "components/MKTypography";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function ExistingQuestionCard({ chat }) {
  return (
    <Card
      component={Link}
      to={`/portaal/chat-sessie?chatId=${chat.id}`}
      sx={{
        "&:hover": {
          transform: "scale(1.02)",
          transition: "transform 0.3s ease-in-out",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
        },
        height: "100%",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <MKTypography display="block" variant="button" color="text" fontWeight="regular" mb={0.75}>
          <Fragment key={chat.createdAt}>
            {/* // Here we format the date into a proper dutch date string */}
            {new Date(chat.createdAt).toLocaleDateString("nl-NL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Fragment>
        </MKTypography>

        <Typography variant="h5" gutterBottom>
          {chat.subject}
        </Typography>

        <MKTypography
          variant="body2"
          color="text"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 10, // Limit to 6 lines
            WebkitBoxOrient: "vertical",
            flex: 1,
          }}
        >
          {chat.firstUserMessage.text}
        </MKTypography>
      </CardContent>
    </Card>
  );
}

ExistingQuestionCard.propTypes = {
  chat: PropTypes.object.isRequired,
};

export default ExistingQuestionCard;
