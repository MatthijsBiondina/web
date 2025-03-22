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

// @mui material components
import Card from "@mui/material/Card";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Authentication layout components
import CoverLayout from "pages/Authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-home.jpg";

import { useAuth } from "contexts/AuthContext";
import useEmailVerificationHooks from "./hooks/useEmailVerification";
import { Navigate } from "react-router-dom";

function EmailVerification() {
  const { currentUser } = useAuth();
  const { formValues, alertState, loading, handleResendEmail, handleRefresh, closeAlert } =
    useEmailVerificationHooks();
  const { timeLeft, error, notification } = formValues;
  const { openAlert } = alertState;

  if (!currentUser) {
    return <Navigate to="/authenticatie/inloggen" />;
  }
  if (currentUser.emailVerified) {
    return <Navigate to="/portaal" />;
  }

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MKBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Bijna klaar!
          </MKTypography>
          <MKTypography display="block" variant="button" color="white" my={1}>
            Verificatie van e-mailadres vereist
          </MKTypography>
        </MKBox>

        <MKBox pt={4} pb={3} px={3} textAlign="center">
          <MKTypography variant="body2" color="text" mb={3}>
            We hebben een verificatie e-mail gestuurd naar <strong>{currentUser.email}</strong>.
            Klik op de link in de e-mail om uw account te activeren. Als u de e-mail niet kunt
            vinden, controleer dan uw spam-folder of vraag een nieuwe verificatie e-mail aan.
          </MKTypography>

          <MKBox mt={3} mb={1} textAlign="center">
            <MKButton
              variant="gradient"
              color="info"
              onClick={handleResendEmail}
              disabled={loading || timeLeft > 0}
            >
              {timeLeft > 0
                ? `Opnieuw versturen (${timeLeft}s)`
                : "Verstuur verificatie e-mail opnieuw"}
            </MKButton>
          </MKBox>

          <MKBox mt={3} mb={1} textAlign="center">
            <MKButton variant="outlined" color="info" onClick={handleRefresh}>
              Ik heb geverifieerd
            </MKButton>
          </MKBox>
        </MKBox>
      </Card>

      {/* Notification alerts */}
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeAlert} severity={error ? "error" : "success"} sx={{ width: "100%" }}>
          {error || notification}
        </Alert>
      </Snackbar>
    </CoverLayout>
  );
}

export default EmailVerification;
