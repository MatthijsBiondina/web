import { useState, useEffect } from "react";
import { useAuth } from "contexts/AuthContext";

function useEmailVerificationHooks() {
  const { currentUser, sendVerificiationEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleResendEmail = async () => {
    if (timeLeft > 0) return;

    setLoading(true);
    setError("");

    try {
      await sendVerificiationEmail();
      setNotification("Verificatie e-mail is verzonden. Controleer je inbox.");
      setOpenAlert(true);
      setTimeLeft(60);
    } catch (error) {
      setError("Er is een fout opgetreden. Probeer het later opnieuw.");
      setOpenAlert(true);
    }
    setLoading(false);
  };

  const handleRefresh = () => {
    // Force refresh user to check if email is verified
    currentUser
      .reload()
      .then(() => {
        if (currentUser.emailVerified) {
          window.location.reload();
        } else {
          setNotification("E-mail is nog niet geverifieerd. Controleer je inbox.");
          setOpenAlert(true);
        }
      })
      .catch((error) => {
        console.log("handleRefresh error", error);
        setError("Er is een fout opgetreden. Probeer het later opnieuw.");
        setOpenAlert(true);
      });
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  // Countdown timer for email resend
  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return {
    formValues: {
      error,
      setError,
      notification,
      setNotification,
      timeLeft,
      setTimeLeft,
    },

    alertState: {
      openAlert,
      setOpenAlert,
    },

    loading,

    // Handlers
    handleResendEmail,
    handleRefresh,
    closeAlert: handleCloseAlert,
  };
}

export default useEmailVerificationHooks;
