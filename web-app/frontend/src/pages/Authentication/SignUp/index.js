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

// react-router-dom components
import { Link, useNavigate, Navigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import MuiLink from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import MicrosoftIcon from "@mui/icons-material/Window";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Authentication layout components

// Images
import bgImage from "assets/images/bg-home.jpg";
import BasicLayout from "../components/BasicLayout";

// Firebase authentication
import { useAuth } from "contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import { updateProfile } from "firebase/auth";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const emailInputRef = useRef(null);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const termsCheckboxRef = useRef(null);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const { currentUser, signup, loginWithProvider, error, setError } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/portaal" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !passwordConfirm) {
      setError("Vul alle velden in");
      setOpenAlert(true);
      return;
    }

    if (password != passwordConfirm) {
      setError("Wachtwoorden komen niet overeen.");
      setOpenAlert(true);
      return;
    }

    if (!hasAcceptedTerms) {
      setError("Je moet de algemene voorwaarden accepteren om door te gaan.");
      setOpenAlert(true);
      return;
    }

    try {
      setLoading(true);
      const result = await signup(email, password, hasAcceptedTerms);

      if (result.success) {
        // If name was provided, update profile with it
        if (name) {
          await updateProfile({ displayName: name });
        }

        setSuccess("Account succesvol aangemaakt.");
        setOpenAlert(true);
        setTimeout(() => {
          navigate("/portaal");
        }, 1500);
      } else {
        setOpenAlert(true);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setOpenAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxClick = () => {
    if (!hasAcceptedTerms) {
      setHasAcceptedTerms(true);
      if (termsCheckboxRef.current) {
        termsCheckboxRef.current.setCustomValidity("");
      }
    } else {
      setHasAcceptedTerms(false);
      if (termsCheckboxRef.current) {
        termsCheckboxRef.current.setCustomValidity(
          "Je moet de algemene voorwaarden accepteren om door te gaan."
        );
      }
    }
  };

  const handleCheckboxChange = (e) => {
    setHasAcceptedTerms(e.target.checked);
    if (e.target.checked) {
      e.target.setCustomValidity("");
    } else {
      e.target.setCustomValidity("Je moet de algemene voorwaarden accepteren om door te gaan.");
    }
  };

  useEffect(() => {
    if (termsCheckboxRef.current) {
      termsCheckboxRef.current.setCustomValidity(
        "Je moet de algemene voorwaarden accepteren om door te gaan."
      );
    }
  }, []);

  const handleProviderSignIn = async (providerName, displayName) => {
    try {
      setLoading(true);
      const result = await loginWithProvider(providerName);
      if (result.success) {
        setSuccess(`Succesvol ingelogd met ${displayName}.`);
        setOpenAlert(true);
        setTimeout(() => {
          navigate("/portaal");
        }, 1500);
      } else {
        setOpenAlert(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
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
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MKTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
                onClick={(e) => {
                  e.preventDefault();
                  handleProviderSignIn("google", "Google");
                }}
              >
                <GoogleIcon color="inherit" />
              </MKTypography>
            </Grid>
            <Grid item xs={2}>
              <MKTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
                onClick={(e) => {
                  e.preventDefault();
                  handleProviderSignIn("facebook", "Facebook");
                }}
              >
                <FacebookIcon color="inherit" />
              </MKTypography>
            </Grid>
            <Grid item xs={2}>
              <MKTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
                onClick={(e) => {
                  e.preventDefault();
                  handleProviderSignIn("microsoft", "Microsoft");
                }}
              >
                <MicrosoftIcon color="inherit" />
              </MKTypography>
            </Grid>
          </Grid>
        </MKBox>
        <MKBox p={3}>
          <MKBox component="form" role="form" onSubmit={handleSubmit}>
            <MKBox mb={2}>
              <MKInput
                type="text"
                label="Naam"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                type="email"
                label="E-mail"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                type="password"
                label="Wachtwoord"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                type="password"
                label="Bevestig Wachtwoord"
                fullWidth
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </MKBox>
            <MKBox display="flex" alignItems="center" ml={-1}>
              <Checkbox
                checked={hasAcceptedTerms}
                onChange={handleCheckboxChange}
                onClick={handleCheckboxClick}
                required
                inputRef={termsCheckboxRef}
                inputProps={{ "aria-label": "Accepteer algemene voorwaarden" }}
              />
              <MKTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                onClick={handleCheckboxClick}
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
            <MKBox mt={3} mb={1}>
              <MKButton variant="gradient" color="info" fullWidth type="submit" disabled={loading}>
                {loading ? "Bezig met registreren..." : "Registreren"}
              </MKButton>
            </MKBox>
            <MKBox mt={3} mb={1} textAlign="center">
              <MKTypography variant="button" color="text">
                Heb je al een account? Ga naar{" "}
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
        </MKBox>
      </Card>

      {/* Notification Alerts */}
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || success}
        </Alert>
      </Snackbar>
    </BasicLayout>
  );
}

export default SignUp;
