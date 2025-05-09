import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function AdminRoute({ children }) {
  const { currentUser, mongoUser } = useAuth();

  if (!currentUser || !mongoUser) {
    return <Navigate to="/authenticatie/inloggen" replace />;
  }

  if (!mongoUser.admin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
