/**
 * SignUp Page Component
 *
 * This is the main container component for the signup page.
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";

// Material Kit components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Local components
import BasicLayout from "../components/BasicLayout";
import SignUpForm from "./components/SignUpForm";
import SocialSignIn from "./components/SocialSignIn";
import AlertNotification from "./components/AlertNotification";

// Hooks
import useSignUpForm from "./hooks/useSignUpForm";
import { useAuth } from "contexts/AuthContext";

// Images
import bgImage from "assets/images/bg-home.jpg";

function SignUp() {
  const {
    formValues,
    formErrors,
    formRefs,
    alertState,
    loading,
    handleSubmit,
    closeAlert,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handlePrivacyChange,
    handlePrivacyClick,
    handleTermsChange,
    handleTermsClick,
  } = useSignUpForm();

  const { currentUser, loginWithProvider } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/portaal", { replace: true });
    }
  }, [currentUser, navigate]);

  // Handle social provider login
  const handleProviderSignIn = async (providerName, displayName) => {
    try {
      const result = await loginWithProvider(providerName);
      if (result.success) {
        formValues.setSuccess(`Succesvol ingelogd met ${displayName}.`);
        alertState.setOpenAlert(true);
        setTimeout(() => {
          navigate("/portaal");
        }, 1500);
      } else {
        alertState.setOpenAlert(true);
      }
    } catch (error) {
      console.error(`${displayName} login error:`, error);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MKBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Maak een account aan
          </MKTypography>

          {/* Social login buttons */}
          <SocialSignIn onProviderSignIn={handleProviderSignIn} />
        </MKBox>
        <MKBox p={3}>
          {/* Signup form */}
          <SignUpForm
            formValues={formValues}
            formErrors={formErrors}
            formRefs={formRefs}
            loading={loading}
            onSubmit={handleSubmit}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handlePasswordConfirmChange={handlePasswordConfirmChange}
            handlePrivacyChange={handlePrivacyChange}
            handlePrivacyClick={handlePrivacyClick}
            handleTermsChange={handleTermsChange}
            handleTermsClick={handleTermsClick}
          />
        </MKBox>
      </Card>

      {/* Notification alerts */}
      <AlertNotification
        open={alertState.openAlert}
        onClose={closeAlert}
        severity={formValues.error ? "error" : "success"}
        message={formValues.error || formValues.success}
      />
    </BasicLayout>
  );
}

export default SignUp;
