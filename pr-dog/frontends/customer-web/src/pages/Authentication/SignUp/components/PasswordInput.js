/**
 * Password Input Component
 *
 * Provides password and password confirmation fields with validation
 */

// Material Kit components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";

function PasswordInput({
  value,
  confirmValue,
  onChange,
  onConfirmChange,
  passwordRef,
  confirmRef,
  error,
}) {
  return (
    <>
      {/* Password field */}
      <MKBox mb={2}>
        <MKInput
          type="password"
          label="Wachtwoord"
          fullWidth
          value={value}
          onChange={onChange}
          inputRef={passwordRef}
          required
          error={!!error}
          inputProps={{
            "aria-label": "Wachtwoord",
            onInvalid: (e) => {
              if (!value) {
                e.target.setCustomValidity("Vul een wachtwoord in.");
              } else {
                e.target.setCustomValidity(error || "");
              }
            },
          }}
        />
        {error && (
          <MKTypography variant="caption" color="error">
            {error}
          </MKTypography>
        )}
      </MKBox>

      {/* Password confirmation field */}
      <MKBox mb={2}>
        <MKInput
          type="password"
          label="Bevestig Wachtwoord"
          fullWidth
          value={confirmValue}
          onChange={onConfirmChange}
          inputRef={confirmRef}
          required
          error={value !== confirmValue && confirmValue !== ""}
          inputProps={{
            "aria-label": "Bevestig Wachtwoord",
            onInvalid: (e) => {
              if (!confirmValue) {
                e.target.setCustomValidity("Bevestig je wachtwoord.");
              } else if (value !== confirmValue) {
                e.target.setCustomValidity("Wachtwoorden komen niet overeen.");
              }
            },
          }}
        />
        {value !== confirmValue && confirmValue !== "" && (
          <MKTypography variant="caption" color="error">
            Wachtwoorden komen niet overeen.
          </MKTypography>
        )}
      </MKBox>
    </>
  );
}

//PropTypes validation
PasswordInput.propTypes = {
  // Required props
  value: PropTypes.string.isRequired,
  confirmValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirmChange: PropTypes.func.isRequired,

  // Optional props
  passwordRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  confirmRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  error: PropTypes.string,
};

// Default props
PasswordInput.defaultProps = {
  passwordRef: null,
  confirmRef: null,
  error: "",
};

export default PasswordInput;
