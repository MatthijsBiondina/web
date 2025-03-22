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

// React imports
import { useEffect } from "react";

// React Router imports
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// MUI imports
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Theme configuration
import theme from "assets/theme";

// Context providers
import { AuthProvider } from "./contexts/AuthContext";

// Route components
import AuthorizedRoute from "components/MYRoutes/AuthorizedRoute";
import PrivateRoute from "components/MYRoutes/PrivateRoute";

// Authentication pages
import SignInPage from "layouts/authentication/sign-in";
import SignUpPage from "layouts/authentication/sign-up";
import SignOutPage from "layouts/authentication/sign-out";

// Authorization pages
import EmailVerificationPage from "layouts/authorization/email-verification";
import LoadingScreen from "layouts/authorization/loading";

// Portal pages
import PortalOverviewPage from "layouts/pages/portal/overview";
import ConversationPage from "layouts/pages/portal/conversation";
import TermsFormPage from "layouts/pages/portal/terms-acceptance";

// Landing pages
import HomePage from "layouts/pages/landing-pages/home";

// Support pages
import PrivacyPage from "layouts/pages/support/privacy";
import TermsPage from "layouts/pages/support/terms";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          {/* Landing Pages */}
          <Route path="/home" element={<HomePage />} />

          {/* Support Pages */}
          <Route path="/privacybeleid" element={<PrivacyPage />} />
          <Route path="/algemene-voorwaarden" element={<TermsPage />} />

          {/* Authenticatie */}
          <Route path="/authenticatie">
            <Route path="inloggen" element={<SignInPage />} />
            <Route path="registreren" element={<SignUpPage />} />
            <Route path="uitloggen" element={<SignOutPage />} />
            <Route path="*" element={<Navigate to="/authenticatie/inloggen" replace />} />
          </Route>

          {/* Terms acceptance page - requires authentication */}
          <Route
            path="/portaal/voorwaarden"
            element={
              <PrivateRoute>
                <TermsFormPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/authorizatie/laadscherm"
            element={
              <PrivateRoute>
                <LoadingScreen />
              </PrivateRoute>
            }
          />

          <Route
            path="/authorizatie/email-verificatie"
            element={
              <PrivateRoute>
                <EmailVerificationPage />
              </PrivateRoute>
            }
          />

          {/* Authorization routes. */}

          {/* Accessing portal requires authentication */}
          <Route
            path="/portaal/*"
            element={
              <PrivateRoute>
                <AuthorizedRoute>
                  <Routes>
                    <Route path="*" element={<PortalOverviewPage />} />
                    <Route path="conversatie" element={<ConversationPage />} />
                  </Routes>
                </AuthorizedRoute>
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}
