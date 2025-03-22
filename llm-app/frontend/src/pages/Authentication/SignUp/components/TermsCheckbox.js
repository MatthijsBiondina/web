/**
 * Terms Checkbox Component
 *
 * Handles the terms and conditions acceptance checkbox
 */

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// MUI components
import Checkbox from "@mui/material/Checkbox";

// Material Kit components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function TermsCheckbox({
  privacyChecked,
  onPrivacyChange,
  onPrivacyClick,
  privacyInputRef = null,
  termsChecked,
  onTermsChange,
  onTermsClick,
  termsInputRef = null,
}) {
  return (
    <>
      <MKBox display="flex" alignItems="center" ml={-1}>
        <Checkbox
          checked={privacyChecked}
          onChange={onPrivacyChange}
          required
          inputRef={privacyInputRef}
          inputProps={{ "aria-label": "Accepteer het privacybeleid" }}
        />
        <MKTypography
          variant="button"
          fontWeight="regular"
          color="text"
          sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          onClick={onPrivacyClick}
        >
          &nbsp;&nbsp;Ik ga akkoord met het&nbsp;
        </MKTypography>
        <MKTypography
          component={Link}
          to="/privacybeleid"
          variant="button"
          fontWeight="bold"
          color="info"
          textGradient
        >
          Privacybeleid
        </MKTypography>
      </MKBox>
      <MKBox display="flex" alignItems="center" ml={-1}>
        <Checkbox
          checked={termsChecked}
          onChange={onTermsChange}
          required
          inputRef={termsInputRef}
          inputProps={{ "aria-label": "Accepteer algemene voorwaarden" }}
        />
        <MKTypography
          variant="button"
          fontWeight="regular"
          color="text"
          sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          onClick={onTermsClick}
        >
          &nbsp;&nbsp;Ik ga akkoord met de&nbsp;
        </MKTypography>
        <MKTypography
          component={Link}
          to="/algemene-voorwaarden"
          variant="button"
          fontWeight="bold"
          color="info"
          textGradient
        >
          Algemene Voorwaarden
        </MKTypography>
      </MKBox>
    </>
  );
}

// PropTypes definitions
TermsCheckbox.propTypes = {
  privacyChecked: PropTypes.bool.isRequired,
  onPrivacyChange: PropTypes.func.isRequired,
  onPrivacyClick: PropTypes.func.isRequired,
  privacyInputRef: PropTypes.object,
  termsChecked: PropTypes.bool.isRequired,
  onTermsChange: PropTypes.func.isRequired,
  onTermsClick: PropTypes.func.isRequired,
  termsInputRef: PropTypes.object,
};

export default TermsCheckbox;
