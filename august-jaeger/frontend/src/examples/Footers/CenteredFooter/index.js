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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function CenteredFooter({
  company = { href: "/home", name: "August Jaeger" },
  links = [
    { href: "/home", name: "Home" },
    { href: "/about", name: "About" },
    { href: "/contact", name: "Contact" },
  ],
  socials = [],
  light = false,
}) {
  const { href, name } = company;

  const year = new Date().getFullYear();

  const renderLinks = links.map((link) => (
    <MKTypography
      key={link.name}
      component={Link}
      href={link.href}
      variant="body2"
      color={light ? "white" : "secondary"}
      fontWeight="regular"
    >
      {link.name}
    </MKTypography>
  ));

  const renderSocials = socials.map((social) => (
    <MKTypography
      key={social.link}
      component={Link}
      href={social.link}
      variant="body2"
      color={light ? "white" : "secondary"}
      fontWeight="regular"
    >
      {social.icon}
    </MKTypography>
  ));

  return (
    <MKBox component="footer" py={6}>
      <Grid container justifyContent="center">
        <Grid item xs={10} lg={8}>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            spacing={{ xs: 2, lg: 3, xl: 6 }}
            mb={3}
          >
            {renderLinks}
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack display="flex" direction="row" justifyContent="center" spacing={3} mt={1} mb={3}>
            {renderSocials}
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
          <MKTypography variant="body2" color={light ? "white" : "secondary"}>
            Copyright &copy; {year} All rights reserved by{" "}
            <MKTypography
              component={Link}
              href={href}
              target="_blank"
              rel="noreferrer"
              variant="body2"
              color={light ? "white" : "secondary"}
            >
              {name}
            </MKTypography>
            .
          </MKTypography>
        </Grid>
      </Grid>
    </MKBox>
  );
}

// Typechecking props for the CenteredFooter
CenteredFooter.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  socials: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  light: PropTypes.bool,
};

export default CenteredFooter;
