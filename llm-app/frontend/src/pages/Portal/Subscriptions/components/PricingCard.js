/**
=========================================================
* Material Kit 2 PRO React - v2.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

function PricingCard({
  variant = "contained",
  color = "dark",
  title,
  description,
  price,
  specifications,
  action,
}) {
  let titleColor = "white";
  let priceColor = "white";
  let buttonColor = "white";
  let bgColor = "white";
  let cardStyles = {};

  if (variant === "contained") {
    titleColor = color;
    priceColor = color;
    buttonColor = color;
    bgColor = "white";
  } else if (variant === "gradient") {
    bgColor = color;
    if (color === "light") {
      titleColor = "dark";
      priceColor = "dark";
      buttonColor = "dark";
    }
  } else if (variant === "outline") {
    titleColor = color;
    priceColor = color;
    buttonColor = color;
    bgColor = "transparent";
    cardStyles = {
      border: `2px solid`,
      borderColor: (theme) => theme.palette[color]?.main || theme.palette.grey[400],
    };
  }

  const textColor =
    variant === "contained" ||
    (variant === "gradient" && color === "light") ||
    variant === "outline"
      ? "text"
      : "white";

  const renderSpecifications = specifications.map((specification) => (
    <MKBox key={specification} display="flex" alignItems="center" pb={2}>
      <MKBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="1.5rem"
        height="1.5rem"
        mr={2}
        mt={-0.125}
        lineHeight={0}
      >
        <MKTypography variant="body1" color={titleColor} sx={{ lineHeight: 0 }}>
          <Icon>done</Icon>
        </MKTypography>
      </MKBox>
      <MKTypography variant="button" color={textColor} fontWeight="regular">
        {specification}
      </MKTypography>
    </MKBox>
  ));

  return (
    <Card sx={{ width: "100%", height: "100%", overflow: "hidden", ...cardStyles }}>
      <MKBox
        variant={variant === "outline" ? "contained" : variant}
        bgColor={bgColor}
        height="100%"
      >
        <MKBox p={3} lineHeight={1}>
          <MKTypography variant="h5" fontWeight="bold" color={titleColor} mb={0.5}>
            {title}
          </MKTypography>
          <MKTypography variant="button" color={textColor} mb={2}>
            {description}
          </MKTypography>
          <MKTypography variant="h3" color={priceColor} mt={2} mb={1}>
            {price.value}&nbsp;
            {price.type && (
              <MKTypography
                display="inline"
                component="small"
                variant="h6"
                color={
                  variant === "contained" ||
                  (variant === "gradient" && color === "light") ||
                  variant === "outline"
                    ? "secondary"
                    : "white"
                }
                sx={{
                  fontFamily: ({ typography: { h1 } }) => h1.fontFamily,
                }}
              >
                / {price.type}
              </MKTypography>
            )}
          </MKTypography>
          {action.type === "internal" ? (
            <MKBox mt={3}>
              <MKButton
                component={action.disabled ? "button" : Link}
                to={action.disabled ? undefined : action.route}
                variant={
                  variant === "gradient"
                    ? "contained"
                    : variant === "outline"
                    ? "outlined"
                    : "gradient"
                }
                size="small"
                color={buttonColor}
                disabled={action.disabled ?? false}
                fullWidth
              >
                {action.label}
              </MKButton>
            </MKBox>
          ) : (
            <MKBox mt={3}>
              <MKButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant={
                  variant === "gradient"
                    ? "contained"
                    : variant === "outline"
                    ? "outlined"
                    : "gradient"
                }
                size="small"
                color={buttonColor}
                disabled={action.disabled ?? false}
                fullWidth
              >
                {action.label}
              </MKButton>
            </MKBox>
          )}
        </MKBox>
        <Divider
          light={variant === "gradient" || (variant === "gradient" && color === "light")}
          sx={{ my: 0, opacity: variant === "gradient" ? 0.5 : 0.25 }}
        />
        <MKBox p={3}>{renderSpecifications}</MKBox>
      </MKBox>
    </Card>
  );
}

// Typechecking props for the SimplePricingCard
PricingCard.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient", "outline"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string,
  }).isRequired,
  specifications: PropTypes.arrayOf(PropTypes.string).isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  }).isRequired,
};

export default PricingCard;
