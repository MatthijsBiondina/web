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

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
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

// Authentication pages components
import BasicLayout from "pages/Authentication/components/BasicLayout";

// Firebase authentication
import { useAuth } from "contexts/AuthContext";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../firebase";

// Images
import bgImage from "assets/images/bg-home.jpg";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/portaal" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Vul zowel e-mail als wachtwoord in.");
      setOpenAlert(true);
      return;
    }

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      setSuccess("Succesvol ingelogd.");
      setOpenAlert(true);
      // Redirect to portal after succesful login
      setTimeout(() => {
        navigate("/portaal");
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.code === "auth/invalid-credential"
          ? "Ongeldige e-mail of wachtwoord"
          : "Er is een fout opgetreden bij het inloggen"
      );
      setOpenAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSignIn = async (provider, providerName) => {
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      setSuccess(`Succesvol ingelogd met ${providerName}.`);
      setOpenAlert(true);
      setTimeout(() => {
        navigate("/portaal");
      }, 1500);
    } catch (error) {
      console.error(`${providerName} sign in error:`, error);
      setError(`Er is een fout opgetreden bij het inloggen met ${providerName}`);
      setOpenAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await handleProviderSignIn(provider, "Google");
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    await handleProviderSignIn(provider, "Facebook");
  };

  const handleMicrosoftSignIn = async () => {
    const provider = new OAuthProvider("microsoft.com");
    await handleProviderSignIn(provider, "Microsoft");
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
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Inloggen
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
                  handleGoogleSignIn();
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
                  handleFacebookSignIn();
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
                  handleMicrosoftSignIn();
                }}
              >
                <MicrosoftIcon color="inherit" />
              </MKTypography>
            </Grid>
          </Grid>
        </MKBox>
        <MKBox pt={4} pb={3} px={3}>
          <MKBox component="form" role="form" onSubmit={handleSubmit}>
            <MKBox mb={2}>
              <MKInput
                type="email"
                label="E-mail"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MKBox>
            <MKBox mt={4} mb={1}>
              <MKButton variant="gradient" color="info" fullWidth type="submit" disabled={loading}>
                {loading ? "Bezig met inloggen..." : "Inloggen"}
              </MKButton>
            </MKBox>
            <MKBox mt={3} mb={1} textAlign="center">
              <MKTypography variant="button" color="text">
                Nog geen account? Registreer je{" "}
                <MKTypography
                  component={Link}
                  to="/authenticatie/registreren"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  hier
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

export default SignIn;
