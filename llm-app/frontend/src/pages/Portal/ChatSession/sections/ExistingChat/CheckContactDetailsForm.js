import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MKButton from "components/MKButton";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import useUserService from "pages/Portal/ChatSession/hooks/useUserService";
import MKInput from "components/MKInput";

function CheckContactDetailsForm({ handleAskProfessor, handleRejectAskProfessor }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userEmailValidation, setUserEmailValidation] = useState(false);
  const [emailAddressesValid, setEmailAddressesValid] = useState(true);

  const { getUserProfile, loading, error } = useUserService();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await getUserProfile();
      setUserName(response.displayName);
      setUserEmail(response.email);
      setUserEmailValidation(response.email);
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    setEmailAddressesValid(userEmail === userEmailValidation);
  }, [userEmail, userEmailValidation]);

  return (
    <MKBox width="100%" bgColor="white" borderRadius="xl" shadow="lg" p={3} sx={{ marginTop: 3 }}>
      <MKBox
        maxWidth="95%"
        sx={{
          padding: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="body2" color="dark" sx={{ fontWeight: "normal" }}>
            Ik heb de volgende gegevens bij je account gevonden:
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <MKBox component="form" role="form" mt={2}>
            <MKInput
              type="text"
              label="Naam"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </MKBox>
          <MKBox component="form" role="form" mt={2}>
            <MKInput
              type="email"
              label="E-mail"
              fullWidth
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              error={!emailAddressesValid}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </MKBox>
          <MKBox component="form" role="form" mt={2}>
            <MKInput
              type="email"
              label="E-mail bevestigen"
              fullWidth
              value={userEmailValidation}
              onChange={(e) => setUserEmailValidation(e.target.value)}
              error={!emailAddressesValid}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </MKBox>
        </Grid>

        <Grid item xs={12} mt={2}>
          <Typography variant="body2" color="dark" sx={{ fontWeight: "normal" }}>
            Controleer of de gegevens correct zijn. Als er iets niet klopt of als je het antwoord
            van Professor Dog graag op een ander email adres wilt ontvangen, wijzig dan de gegevens
            hierboven.
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Tooltip
            title={!emailAddressesValid ? "De e-mailadressen komen niet overeen" : ""}
            placement="top"
            arrow
          >
            <span style={{ display: "inline-block", width: "45%", marginRight: "5%" }}>
              <MKButton
                variant="gradient"
                color="info"
                sx={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleAskProfessor(userName, userEmail);
                }}
                disabled={!emailAddressesValid}
              >
                Verzenden
              </MKButton>
            </span>
          </Tooltip>
          <MKButton
            variant="gradient"
            color="secondary"
            sx={{ width: "45%", marginLeft: "5%" }}
            onClick={handleRejectAskProfessor}
          >
            Terug
          </MKButton>
        </Grid>
      </MKBox>
    </MKBox>
  );
}

export default CheckContactDetailsForm;

CheckContactDetailsForm.propTypes = {
  handleAskProfessor: PropTypes.func.isRequired,
  handleRejectAskProfessor: PropTypes.func.isRequired,
};
