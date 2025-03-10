import { useState, useRef, useEffect } from "react";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function useTermsAcceptanceForm() {
  // Form values
  const [hasAcceptedPrivacy, setHasAcceptedPrivacy] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  // Form errors and status
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  // Form refs
  const privacyCheckboxRef = useRef(null);
  const termsCheckboxRef = useRef(null);

  // Auth context
  const { error, setError } = useAuth();
  const navigate = useNavigate();
  const { updateProfile } = useAuth();

  // Privacy checkbox handler
  const handlePrivacyChange = (e) => {
    const isChecked = e.target.checked;
    setHasAcceptedPrivacy(isChecked);

    // Update validation message
    if (privacyCheckboxRef.current) {
      if (isChecked) {
        privacyCheckboxRef.current.setCustomValidity("");
      } else {
        privacyCheckboxRef.current.setCustomValidity(
          "Je moet het privacybeleid accepteren om door te gaan."
        );
      }
    }
  };

  const handlePrivacyClick = () => {
    setHasAcceptedPrivacy(!hasAcceptedPrivacy);

    if (privacyCheckboxRef.current) {
      if (!hasAcceptedPrivacy) {
        privacyCheckboxRef.current.setCustomValidity("");
      } else {
        privacyCheckboxRef.current.setCustomValidity(
          "Je moet het privacybeleid accepteren om door te gaan."
        );
      }
    }
  };

  // Terms checkbox handler
  const handleTermsChange = (e) => {
    const isChecked = e.target.checked;
    setHasAcceptedTerms(isChecked);

    // Update validation message
    if (termsCheckboxRef.current) {
      if (isChecked) {
        termsCheckboxRef.current.setCustomValidity("");
      } else {
        termsCheckboxRef.current.setCustomValidity(
          "Je moet de algemene voorwaarden accepteren om door te gaan."
        );
      }
    }
  };

  const handleTermsClick = () => {
    setHasAcceptedTerms(!hasAcceptedTerms);

    if (termsCheckboxRef.current) {
      if (!hasAcceptedTerms) {
        termsCheckboxRef.current.setCustomValidity("");
      } else {
        termsCheckboxRef.current.setCustomValidity(
          "Je moet de algemene voorwaarden accepteren om door te gaan."
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!hasAcceptedPrivacy) {
      setError("Je moet het privacybeleid accepteren om door te gaan.");
      setOpenAlert(true);
      return;
    }

    if (!hasAcceptedTerms) {
      setError("Je moet de algemene voorwaarden accepteren om door te gaan.");
      setOpenAlert(true);
      return;
    }

    // Submit form
    try {
      setLoading(true);
      const allTermsAccepted = hasAcceptedTerms && hasAcceptedPrivacy;

      const result = await updateProfile({
        hasAcceptedTerms: allTermsAccepted,
      });

      if (result.success) {
        setSuccess("Voorwaarden geaccepteerd.");
        setOpenAlert(true);
        setTimeout(() => {
          navigate("/portaal");
        }, 1500);
      } else {
        setOpenAlert(true);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setOpenAlert(true);
    } finally {
      setLoading(false);
    }
  };

  // Alert close handler
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  // Initialize form validation on mount
  useEffect(() => {
    if (privacyCheckboxRef.current) {
      privacyCheckboxRef.current.setCustomValidity(
        "Je moet het privacybeleid accepteren om door te gaan."
      );
    }
    if (termsCheckboxRef.current) {
      termsCheckboxRef.current.setCustomValidity(
        "Je moet de algemene voorwaarden accepteren om door te gaan."
      );
    }
  }, []);

  return {
    // Form values and setters
    formValues: {
      hasAcceptedPrivacy,
      setHasAcceptedPrivacy,
      hasAcceptedTerms,
      setHasAcceptedTerms,
      error,
      setError,
      success,
      setSuccess,
    },

    // Form refs
    formRefs: {
      privacyCheckboxRef,
      termsCheckboxRef,
    },

    // Alert state
    alertState: {
      openAlert,
      setOpenAlert,
    },

    // Loading state
    loading,

    // Handlers
    handlePrivacyChange,
    handlePrivacyClick,
    handleTermsChange,
    handleTermsClick,
    handleSubmit,
    closeAlert: handleCloseAlert,
  };
}

export default useTermsAcceptanceForm;
