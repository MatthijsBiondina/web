import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function TermsRequiredRoute({ children }) {
  const { mongoUser } = useAuth();

  if (!mongoUser.hasAcceptedTerms) {
    return <Navigate to="/portaal/voorwaarden" replace />;
  }

  return children;
}

TermsRequiredRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
