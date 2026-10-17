import { createContext, useCallback, useEffect, useState } from "react";

import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import auth from "./firebase.config";

export const AuthContext = createContext(null);

const getAuthErrorMessage = (error) => {
  const messages = {
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/user-not-found": "No account was found with this email.",
    "auth/wrong-password": "Incorrect email or password.",
    "auth/weak-password": "Please choose a stronger password.",
    "auth/too-many-requests": "Too many attempts. Please wait and try again.",
    "auth/network-request-failed":
      "Network error. Please check your internet connection.",
    "auth/operation-not-allowed": "This authentication method is not enabled.",
    "auth/user-disabled":
      "This account has been disabled. Please contact support.",
    "auth/popup-blocked": "Your browser blocked the Google sign-in popup.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/cancelled-popup-request":
      "A Google sign-in request is already in progress.",
    "auth/unauthorized-domain": "This domain is not authorized in Firebase.",
    "auth/account-exists-with-different-credential":
      "An account already exists with this email using another sign-in method.",
    "auth/requires-recent-login":
      "Please sign in again before performing this action.",
  };

  return messages[error?.code] || "Something went wrong. Please try again.";
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (authError) => {
        setError(getAuthErrorMessage(authError));
        setUser(null);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const handleAuthAction = useCallback(async (action) => {
    setError(null);

    try {
      return await action();
    } catch (authError) {
      const message = getAuthErrorMessage(authError);

      setError(message);

      // Keep the Firebase error code available to callers.
      throw Object.assign(new Error(message), {
        code: authError?.code,
      });
    }
  }, []);

  const createUser = useCallback(
    (email, password, fullName) =>
      handleAuthAction(async () => {
        const credential = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password,
        );

        if (fullName?.trim()) {
          await updateProfile(credential.user, {
            displayName: fullName.trim(),
          });
        }

        return credential;
      }),
    [handleAuthAction],
  );

  const signIn = useCallback(
    (email, password, rememberMe = true) =>
      handleAuthAction(async () => {
        await setPersistence(
          auth,
          rememberMe ? browserLocalPersistence : browserSessionPersistence,
        );

        return signInWithEmailAndPassword(auth, email.trim(), password);
      }),
    [handleAuthAction],
  );

  const GoogleSignIn = useCallback(
    () =>
      handleAuthAction(async () => {
        const provider = new GoogleAuthProvider();

        provider.setCustomParameters({
          prompt: "select_account",
        });

        return signInWithPopup(auth, provider);
      }),
    [handleAuthAction],
  );

  const logOut = useCallback(
    () => handleAuthAction(() => signOut(auth)),
    [handleAuthAction],
  );

  const resetPassword = useCallback(
    (email) =>
      handleAuthAction(() => sendPasswordResetEmail(auth, email.trim())),
    [handleAuthAction],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const authInfo = {
    user,
    loading,
    error,
    createUser,
    signIn,
    GoogleSignIn,
    logOut,
    resetPassword,
    clearError,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
