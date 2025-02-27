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
} from "firebase/auth";
import { auth } from "../firebase";
import { userService } from "services/mongoService";

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
      // Try to get existing MongoDB user
      return await userService.getProfile().catch(async () => {
        return await userService.createUser();
      });
    } catch (error) {
      console.error("Error syncing with MongoDB:", error);
      return null;
    }
  }

  async function signup(email, password) {
    try {
      setError("");
      const credential = await createUserWithEmailAndPassword(auth, email, password);

      // Create MongoDB user
      try {
        const mongoUserData = await userService.createUser();
        setMongoUser(mongoUserData);
      } catch (mongoError) {
        console.error("Error creating MongoDB user:", mongoError);
      }

      return { success: true, user: credential.user };
    } catch (error) {
      console.error("Signup error:", error);
      setError(
        error.code === "auth/email-already-in-use"
          ? "Dit e-mailadres is al in gebruik"
          : "Er is een fout opgetreden bij het registreren"
      );
      return { success: false, error };
    }
  }

  async function login(email, password) {
    try {
      setError("");
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
      setError(
        error.code === "auth/invalid-credential"
          ? "Ongeldige e-mail of wachtwoord"
          : "Er is een fout opgetreden bij het inloggen"
      );
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
      setError(`Er is een fout opgetreden bij het inloggen met ${providerName}`);
      return { success: false, error };
    }
  }

  function logout() {
    setMongoUser(null);
    return signOut(auth);
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
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
