/**
 * Private route
 */

import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  // If there's no authenticated user, redirect to login page
  if (!currentUser) {
    return <Navigate to="/authenticatie/inloggen" replace />;
  }

  // Otherwise, render the protected component
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
