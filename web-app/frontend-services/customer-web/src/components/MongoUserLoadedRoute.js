import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function MongoUserLoadedRoute({ children }) {
  const { mongoUser } = useAuth();

  if (!mongoUser) {
    return <Navigate to="/authorizatie/laadscherm" replace />;
  }

  return children;
}

MongoUserLoadedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
