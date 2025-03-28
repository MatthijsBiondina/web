// components/RedirectHandler.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PropTypes from "prop-types";

export default function RedirectHandler({ children }) {
  const { redirectUrl, setRedirectUrl } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectUrl) {
      console.log("Redirecting to:", redirectUrl);
      navigate(redirectUrl, { replace: true });
      // Reset the redirect URL after navigation
      setRedirectUrl(null);
    }
  }, [redirectUrl, navigate, setRedirectUrl]);

  return children;
}

RedirectHandler.propTypes = {
  children: PropTypes.node.isRequired,
};
