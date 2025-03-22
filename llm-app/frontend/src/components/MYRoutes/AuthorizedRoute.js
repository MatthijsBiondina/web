/**
 * AuthorizedRoute - Route with comprehensive protection
 * Maps error codes to appropriate redirects
 */

import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthorizedRoute({ children }) {
  const { currentUser, mongoUser } = useAuth();

  // Basic authentication check
  if (!currentUser) {
    return <Navigate to="/authenticatie/inloggen" replace />;
  }

  // Authorization checks
  if (!mongoUser) {
    return <Navigate to="/authorizatie/laadscherm" replace />;
  }
  if (mongoUser.hasAcceptedTerms === false) {
    return <Navigate to="/portaal/voorwaarden" replace />;
  }
  if (currentUser.emailVerified === false) {
    return <Navigate to="/authorizatie/email-verificatie" replace />;
  }

  // All checks passed, render the children
  return children;
}

AuthorizedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
