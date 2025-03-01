/**
 * SignUp Form Component
 *
 * Handles the rendering and interactions for the signup form fields
 */

import { Link } from "react-router-dom";

// Material Kit components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Local components
import PasswordInput from "./PasswordInput";
import TermsCheckbox from "./TermsCheckbox";
import PropTypes from "prop-types";

function SignUpForm({
  formValues,
  formErrors,
  formRefs,
  loading,
  onSubmit,
  handleEmailChange,
  handlePasswordChange,
  handlePasswordConfirmChange,
  handleTermsChange,
  handleTermsClick,
}) {
  const { name, setName, email, password, passwordConfirm, hasAcceptedTerms } = formValues;
  const { emailInputRef, passwordInputRef, passwordConfirmInputRef, termsCheckboxRef } =
    formRefs || {};

  return (
    <MKBox component="form" role="form" onSubmit={onSubmit}>
      {/* Name field */}
      <MKBox mb={2}>
        <MKInput
          type="text"
          label="Naam"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </MKBox>

      {/* Email field */}
      <MKBox mb={2}>
        <MKInput
          type="email"
          label="E-mail"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          inputRef={emailInputRef}
          required
          inputProps={{
            "aria-label": "E-mail",
            onInvalid: (e) => {
              if (!email) {
                e.target.setCustomValidity("Vul een e-mailadres in.");
              } else {
                e.target.setCustomValidity("Vul een geldig e-mailadres in.");
              }
            },
          }}
        />
      </MKBox>

      {/* Password fields */}
      <PasswordInput
        value={password}
        confirmValue={passwordConfirm}
        onChange={handlePasswordChange}
        onConfirmChange={handlePasswordConfirmChange}
        passwordRef={passwordInputRef}
        confirmRef={passwordConfirmInputRef}
        error={formErrors.passwordError}
      />

      {/* Terms checkbox */}
      <TermsCheckbox
        checked={hasAcceptedTerms}
        onChange={handleTermsChange}
        onClick={handleTermsClick}
        required
        inputRef={termsCheckboxRef}
      />

      {/* Submit button */}
      <MKBox mt={3} mb={1}>
        <MKButton variant="gradient" color="info" fullWidth type="submit" disabled={loading}>
          {loading ? "Bezig met registreren..." : "Registreren"}
        </MKButton>
      </MKBox>

      {/* Login link */}
      <MKBox mt={3} mb={1} textAlign="center">
        <MKTypography variant="button" color="text">
          Heb je al een account? Ga naar&nbsp;
          <MKTypography
            component={Link}
            to="/authenticatie/inloggen"
            variant="button"
            color="info"
            fontWeight="medium"
            textGradient
          >
            Inloggen
          </MKTypography>
          .
        </MKTypography>
      </MKBox>
    </MKBox>
  );
}

// PropTypes definitions
SignUpForm.propTypes = {
  formValues: PropTypes.shape({
    name: PropTypes.string,
    setName: PropTypes.func.isRequired,
    email: PropTypes.string,
    password: PropTypes.string,
    passwordConfirm: PropTypes.string,
    hasAcceptedTerms: PropTypes.bool,
  }).isRequired,
  formErrors: PropTypes.shape({
    passwordError: PropTypes.string,
  }),
  formRefs: PropTypes.shape({
    emailInputRef: PropTypes.object,
    passwordInputRef: PropTypes.object,
    passwordConfirmInputRef: PropTypes.object,
    termsCheckboxRef: PropTypes.object,
  }),
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  handlePasswordConfirmChange: PropTypes.func,
  handleTermsChange: PropTypes.func,
};

// Default props
SignUpForm.defaultProps = {
  formErrors: { passwordError: "" },
  formRefs: {},
  loading: false,
  handleEmailChange: null,
  handlePasswordChange: null,
  handlePasswordConfirmChange: null,
  handleTermsChange: null,
};

export default SignUpForm;
