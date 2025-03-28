import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";
import { userService } from "services/userService";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function syncWithMongoDB(user) {
    if (!user) return null;

    try {
      return await userService.getProfile();
    } catch (error) {
      console.log("Error syncing with MongoDB:", error);
      return null;
    }
  }

  async function signup(email, password, acceptedTerms, name = null) {
    try {
      setError("");

      if (!email || !password) {
        setError("Vul alle verplichte velden in.");
        return { success: false, error: new Error("Missing required field.") };
      }

      if (!acceptedTerms) {
        setError("Je moet de algemene voorwaarden accepteren om door te gaan.");
        return { success: false, error: new Error("Terms not accepted") };
      }

      const credential = await createUserWithEmailAndPassword(auth, email, password);

      // Send email verification
      try {
        await sendEmailVerification(credential.user);
      } catch (verificationError) {
        console.error("Error sending verification email:", verificationError);
        // Continue with signup process even if email verification fails
      }

      // Create MongoDB user
      try {
        const userData = { hasAcceptedTerms: acceptedTerms };
        if (name !== null) {
          userData.displayName = name;
        }
        const mongoUserData = await userService.createUser(userData);
        setMongoUser(mongoUserData);
      } catch (mongoError) {
        console.error("Error creating MongoDB user:", mongoError);
      }

      return { success: true, user: credential.user };
    } catch (error) {
      console.error("Signup error:", error);
      setError(getFirebaseErrorMessage(error.code));
      return { success: false, error };
    }
  }

  async function login(email, password) {
    try {
      setError("");

      if (!email || !password) {
        setError("Vul je e-mailadres en wachtwoord in.");
        return { success: false, error: new Error("Missing credentials") };
      }

      const credential = await signInWithEmailAndPassword(auth, email, password);

      // Get MongoDB user
      try {
        const mongoUserData = await syncWithMongoDB(credential.user);
        setMongoUser(mongoUserData);
      } catch (mongoError) {
        console.error("Error fetching MongoDB user:", mongoError);
        // We don't throw here to avoid preventing Firebase auth from completing
      }

      return { success: true, user: credential.user };
    } catch (error) {
      console.error("Login error:", error);
      setError(getFirebaseErrorMessage(error.code));
      return { success: false, error };
    }
  }

  async function loginWithProvider(providerName) {
    let provider;

    switch (providerName) {
      case "google":
        provider = new GoogleAuthProvider();
        break;
      case "facebook":
        provider = new FacebookAuthProvider();
        break;
      case "microsoft":
        provider = new OAuthProvider("microsoft.com");
        break;
      default:
        setError("Onbekende aanbieder");
        return { success: false, error: new Error("Unknown provider") };
    }

    try {
      setError("");
      const result = await signInWithPopup(auth, provider);

      // Sync with MongoDB
      try {
        const mongoUserData = await syncWithMongoDB(result.user);
        setMongoUser(mongoUserData);
      } catch (mongoError) {
        console.error(`Error syncing ${providerName} user with MongoDB:`, mongoError);
        // We don't throw here to avoid preventing Firebase auth from completing
      }

      return { success: true, user: result.user };
    } catch (error) {
      console.error(`${providerName} sign in error:`, error);
      setError(getFirebaseErrorMessage(error.code));
      return { success: false, error };
    }
  }

  // Add this function inside the AuthProvider component
  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      // Email/Password Authentication Errors
      case "auth/email-already-in-use":
        return "Dit e-mailadres is al in gebruik. Log in of gebruik een ander e-mailadres.";
      case "auth/invalid-email":
        return "Ongeldig e-mailadres. Controleer je invoer.";
      case "auth/user-disabled":
        return "Dit account is uitgeschakeld. Neem contact op met de beheerder.";
      case "auth/user-not-found":
        return "Geen account gevonden met dit e-mailadres.";
      case "auth/wrong-password":
        return "Onjuist wachtwoord. Probeer het opnieuw.";
      case "auth/invalid-credential":
        return "Ongeldige inloggegevens. Controleer je e-mail en wachtwoord.";
      case "auth/weak-password":
        return "Je wachtwoord is te zwak. Kies een sterker wachtwoord.";
      case "auth/too-many-requests":
        return "Te veel inlogpogingen. Probeer het later nog eens.";
      case "auth/missing-password":
        return "Voer een wachtwoord in.";

      // OAuth Provider Errors
      case "auth/account-exists-with-different-credential":
        return "Er bestaat al een account met dit e-mailadres maar met een andere inlogmethode.";
      case "auth/popup-closed-by-user":
        return "Inlogproces afgebroken. Probeer het opnieuw.";
      case "auth/cancelled-popup-request":
        return "Inlogproces afgebroken. Probeer het opnieuw.";
      case "auth/popup-blocked":
        return "Pop-up geblokkeerd door je browser. Sta pop-ups toe en probeer het opnieuw.";
      case "auth/operation-not-allowed":
        return "Deze inlogmethode is momenteel niet beschikbaar. Probeer een andere methode.";
      case "auth/provider-already-linked":
        return "Dit account is al gekoppeld aan een andere inlogmethode.";

      // Network Errors
      case "auth/network-request-failed":
        return "Netwerkfout. Controleer je internetverbinding en probeer het opnieuw.";

      // General Errors
      case "auth/internal-error":
        return "Er is een interne fout opgetreden. Probeer het later opnieuw.";
      case "auth/invalid-api-key":
        return "Ongeldige API-sleutel. Neem contact op met de beheerder.";
      case "auth/app-deleted":
        return "Deze app is niet meer beschikbaar. Neem contact op met de beheerder.";
      default:
        return "Er is een fout opgetreden. Probeer het opnieuw.";
    }
  };

  function logout() {
    setMongoUser(null);
    return signOut(auth);
  }

  // Send email verification function
  async function sendVerificiationEmail() {
    if (!currentUser) {
      setError("Geen gebruiker ingelogd.");
      return { success: false, error: new Error("No user logged in.") };
    }

    try {
      await sendEmailVerification(currentUser);
      return { success: true };
    } catch (error) {
      console.error("Error sending verification email:", error);
      setError(
        getFirebaseErrorMessage(error.code) || "Fout bij het verzenden van verificatie e-mail"
      );
      return { success: false, error };
    }
  }

  // Reload user to check verification status
  async function reloadUser() {
    if (!currentUser) {
      return { success: false, error: new Error("No user logged in") };
    }

    try {
      await currentUser.reload();
      // Update the current user with the fresh data
      setCurrentUser(auth.currentUser);
      return { success: true, emailVerified: auth.currentUser.emailVerified };
    } catch (error) {
      console.error("Error reloading user:", error);
      return { success: false, error };
    }
  }

  // Update user profile in MongoDB
  async function updateProfile(userData) {
    try {
      const updatedMongoUser = await userService.updateProfile(userData);
      setMongoUser(updatedMongoUser);
      return { success: true, user: updatedMongoUser };
    } catch (error) {
      setError("Fout bij het bijwerken van profiel");
      return { success: false, error };
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          const mongoUserData = await syncWithMongoDB(user);
          setMongoUser(mongoUserData);
        } catch (error) {
          console.error("Error synchronizing with MongoDB during auth state change:", error);
        }
      } else {
        setMongoUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    mongoUser,
    error,
    setError,
    signup,
    login,
    loginWithProvider,
    logout,
    updateProfile,
    sendVerificiationEmail,
    reloadUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
