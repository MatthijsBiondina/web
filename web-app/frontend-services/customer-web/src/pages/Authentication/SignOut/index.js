import { Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

function SignOut() {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return <Navigate to="/home" replace />;
  }

  logout();
  return <Navigate to="/home" replace />;
}

export default SignOut;
