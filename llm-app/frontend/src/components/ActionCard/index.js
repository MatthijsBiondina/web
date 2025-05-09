import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ActionCard({ route = null, onClick = null, image, title, description, disabled = false }) {
  const CardWrapper = ({ children }) => {
    // If disabled, apply disabled styles and prevent clicks
    const disabledStyles = disabled
      ? {
          opacity: 0.6,
          pointerEvents: "none", // This prevents all click interactions
          cursor: "not-allowed",
          transform: "none !important", // Prevent hover animations
          boxShadow: "none !important",
        }
      : {};

    // If onClick is provided, use a clickable div
    if (onClick) {
      return (
        <Card
          component="div"
          onClick={disabled ? null : onClick} // Only attach onClick if not disabled
          sx={{
            cursor: disabled ? "not-allowed" : "pointer",
            "&:hover": {
              transform: disabled ? "none" : "scale(1.02)",
              transition: "transform 0.3s ease-in-out",
              boxShadow: disabled ? "none" : "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
            },
            height: "100%",
            ...disabledStyles,
          }}
        >
          {children}
        </Card>
      );
    }

    // If route is provided, use Link (with disabled handling)
    return (
      <Card
        component={disabled ? "div" : Link} // Use div instead of Link when disabled
        to={disabled ? undefined : route} // Only apply route when not disabled
        sx={{
          "&:hover": {
            transform: disabled ? "none" : "scale(1.02)",
            transition: "transform 0.3s ease-in-out",
            boxShadow: disabled ? "none" : "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          },
          height: "100%",
          ...disabledStyles,
        }}
      >
        {children}
      </Card>
    );
  };

  CardWrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <CardWrapper>
      <MKBox position="relative" borderRadius="lg" mx={2} mt={-3}>
        <MKBox
          component="img"
          src={image}
          alt={title}
          borderRadius="lg"
          shadow="md"
          width="100%"
          position="relative"
          zIndex={1}
          sx={disabled ? { filter: "grayscale(50%)" } : {}} // Optional: grayscale effect for disabled
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
            filter: disabled ? "blur(12px) grayscale(50%)" : "blur(12px)", // Optional: add grayscale to blur
            backgroundSize: "cover",
          }}
        />
      </MKBox>
      <MKBox p={3} mt={-2}>
        <MKTypography
          display="inline"
          variant="h5"
          fontWeight="bold"
          sx={disabled ? { color: "text.disabled" } : {}}
        >
          {title}
        </MKTypography>
        <MKTypography variant="body2" color={disabled ? "text.disabled" : "text"}>
          {description}
        </MKTypography>
      </MKBox>
    </CardWrapper>
  );
}

ActionCard.propTypes = {
  route: PropTypes.string,
  onClick: PropTypes.func,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default ActionCard;
