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

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Authentication layout components
import CoverLayout from "pages/Authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-home.jpg";
import useTermsAcceptanceForm from "./hooks/useTermsAcceptanceForm";
import TermsCheckbox from "./components/TermsCheckbox";
import AlertNotification from "pages/Authentication/SignUp/components/AlertNotification";

function TermsAcceptance() {
  const {
    formValues,
    formRefs,
    alertState,
    loading,
    handleSubmit,
    closeAlert,
    handlePrivacyChange,
    handlePrivacyClick,
    handleTermsChange,
    handleTermsClick,
  } = useTermsAcceptanceForm();

  const { hasAcceptedPrivacy, hasAcceptedTerms } = formValues;
  const { privacyCheckboxRef, termsCheckboxRef } = formRefs;

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
            Voordat je verdergaat
          </MKTypography>
          <MKTypography display="block" variant="button" color="white" my={1}>
            &nbsp;
          </MKTypography>
        </MKBox>
        <MKBox p={3}>
          <MKBox component="form" role="form" onSubmit={handleSubmit}>
            <MKTypography variant="body2" fontWeight="regular" color="text">
              Door op de onderstaande vakjes te klikken, bevestig je dat je onze voorwaarden hebt
              gelezen en hiermee akkoord gaat:
            </MKTypography>

            <TermsCheckbox
              privacyChecked={hasAcceptedPrivacy}
              onPrivacyChange={handlePrivacyChange}
              onPrivacyClick={handlePrivacyClick}
              privacyInputRef={privacyCheckboxRef}
              termsChecked={hasAcceptedTerms}
              onTermsChange={handleTermsChange}
              onTermsClick={handleTermsClick}
              termsInputRef={termsCheckboxRef}
            />

            {/* Submit button */}
            <MKBox mt={3} mb={1}>
              <MKButton variant="gradient" color="info" fullWidth type="submit" disabled={loading}>
                {loading ? "Bezig met opslaan..." : "Keuze opslaan"}
              </MKButton>
            </MKBox>
          </MKBox>
        </MKBox>
      </Card>

      {/* Notification alerts */}
      <AlertNotification
        open={alertState.openAlert}
        onClose={closeAlert}
        severity={formValues.error ? "error" : "success"}
        message={formValues.error || formValues.success}
      />
    </CoverLayout>
  );
}

export default TermsAcceptance;
