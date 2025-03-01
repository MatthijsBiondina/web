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

function TermsCheckbox({ checked, onChange, onClick, inputRef }) {
  return (
    <MKBox display="flex" alignItems="center" ml={-1}>
      <Checkbox
        checked={checked}
        onChange={onChange}
        required
        inputRef={inputRef}
        inputProps={{ "aria-label": "Accepteer algmene voorwaarden" }}
      />
      <MKTypography
        variant="button"
        fontWeight="regular"
        color="text"
        sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
        onClick={onClick}
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
        Algmene Voorwaarden
      </MKTypography>
    </MKBox>
  );
}

// PropTypes definitions
TermsCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  inputRef: PropTypes.object,
};

// Default props
TermsCheckbox.defaultProps = {
  inputRef: null,
};

export default TermsCheckbox;
