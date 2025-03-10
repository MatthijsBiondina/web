import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

export default function EmailVerificationRequiredRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser.emailVerified) {
    return <Navigate to="/authorizatie/email-verificatie" replace />;
  }

  return children;
}

EmailVerificationRequiredRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
