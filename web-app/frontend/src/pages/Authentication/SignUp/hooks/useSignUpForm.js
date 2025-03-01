/**
 * Custom hook to manage signup from state and validation
 */

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import validator from "validator";

function useSignUpForm() {
  // Form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState("");

  // Form errors and status
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  // Form refs
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const passwordConfirmInputRef = useRef(null);
  const termsCheckboxRef = useRef(null);

  // Auth context and navigation
  const { signup, error, setError } = useAuth();
  const navigate = useNavigate();

  // Form validation functions
  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Vul een wachtwoord in.");
      return false;
    } else if (value.length < 8) {
      setPasswordError("Wachtwoord moet minimaal 8 tekens lang zijn.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Email change handler
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (emailInputRef.current) {
      if (!value) {
        emailInputRef.current.setCustomValidity("Vul je e-mailadres in.");
      } else if (!validator.isEmail(value)) {
        emailInputRef.current.setCustomValidity("Vul een geldig e-mailadres in.");
      } else {
        emailInputRef.current.setCustomValidity("");
      }
    }
  };

  // Password change handler
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (passwordInputRef.current) {
      if (!validatePassword(value)) {
        passwordInputRef.current.setCustomValidity(passwordError);
      } else {
        passwordInputRef.current.setCustomValidity("");
      }
    }

    // Check password confirmation match
    if (passwordConfirmInputRef.current) {
      if (value !== passwordConfirm) {
        passwordConfirmInputRef.current.setCustomValidity("Wachtwoorden komen niet overeen.");
      } else {
        passwordConfirmInputRef.current.setCustomValidity("");
      }
    }
  };

  // Password confirmation change handler
  const handlePasswordConfirmChange = (e) => {
    const value = e.target.value;
    setPasswordConfirm(value);

    if (passwordConfirmInputRef.current) {
      if (value !== password) {
        passwordConfirmInputRef.current.setCustomValidity("Wachtwoorden komen niet overeen.");
      } else {
        passwordConfirmInputRef.current.setCustomValidity("");
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

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!email || !password || !passwordConfirm) {
      setError("Vul alle velden in.");
      setOpenAlert(true);
      return;
    }

    if (!validatePassword(password)) {
      setError(passwordError);
      setOpenAlert(true);
      return;
    }

    if (password !== passwordConfirm) {
      setError("Wachtwoorden komen niet overeen.");
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
      const result = await signup(email, password, hasAcceptedTerms);

      if (result.success) {
        setSuccess("Account succesvol aangemaakt.");
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
    if (emailInputRef.current) {
      emailInputRef.current.setCustomValidity("Vul een e-mailadres in.");
    }
    if (passwordInputRef.current) {
      passwordInputRef.current.setCustomValidity("Vul een wachtwoord in.");
    }
    if (passwordConfirmInputRef.current) {
      passwordConfirmInputRef.current.setCustomValidity("Bevestig je wachtwoord.");
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
      name,
      setName,
      email,
      setEmail,
      password,
      setPassword,
      passwordConfirm,
      setPasswordConfirm,
      hasAcceptedTerms,
      setHasAcceptedTerms,
      error,
      setError,
      success,
      setSuccess,
    },

    // Form refs
    formRefs: {
      emailInputRef,
      passwordInputRef,
      passwordConfirmInputRef,
      termsCheckboxRef,
    },

    // Form errors
    formErrors: {
      passwordError,
    },

    // Alert state
    alertState: {
      openAlert,
      setOpenAlert,
    },

    // Loading state
    loading,

    // Handlers
    handleEmailChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleTermsChange,
    handleTermsClick,
    handleSubmit,
    closeAlert: handleCloseAlert,
  };
}

export default useSignUpForm;
