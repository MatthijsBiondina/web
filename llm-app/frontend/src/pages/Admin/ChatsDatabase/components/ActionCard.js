import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";
function ActionCard({ route, image, title, description }) {
  return (
    <Card
      component={Link}
      to={route}
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
          {title}
        </MKTypography>
        <MKTypography variant="body2" color="text">
          {description}
        </MKTypography>
      </MKBox>
    </Card>
  );
}

export default ActionCard;

ActionCard.propTypes = {
  route: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
