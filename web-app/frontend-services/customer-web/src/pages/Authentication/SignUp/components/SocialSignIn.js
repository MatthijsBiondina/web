/**
 * Social SignIn Component
 *
 * Renders social media login buttons
 */

import PropTypes from "prop-types";

// MUI components
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// MUI icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import MicrosoftIcon from "@mui/icons-material/Window";

// Material Kit components
import MKTypography from "components/MKTypography";

function SocialSignIn({ onProviderSignIn }) {
  // Social login providers configuration
  const providers = [
    { id: "google", name: "Google", icon: GoogleIcon },
    { id: "facebook", name: "Facebook", icon: FacebookIcon },
    { id: "microsoft", name: "Microsoft", icon: MicrosoftIcon },
  ];

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
      {providers.map((provider) => (
        <Grid item xs={2} key={provider.id}>
          <MKTypography
            component={MuiLink}
            href="#"
            variant="body1"
            color="white"
            onClick={(e) => {
              e.preventDefault();
              onProviderSignIn(provider.id, provider.name);
            }}
          >
            <provider.icon color="inherit" />
          </MKTypography>
        </Grid>
      ))}
    </Grid>
  );
}

// PropTypes definitions
SocialSignIn.propTypes = {
  onProviderSignIn: PropTypes.func.isRequired,
};

export default SocialSignIn;
