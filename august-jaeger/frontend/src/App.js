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

// Landing pages
import HomePage from "layouts/pages/landing-pages/home";
import AboutPage from "layouts/pages/landing-pages/about";
import ContactPage from "layouts/pages/landing-pages/contact";
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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}
