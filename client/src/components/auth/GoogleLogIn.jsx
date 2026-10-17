import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../components/auth/AuthProvider";

const GoogleLogIn = ({
  buttonText = "Continue with Google",
  redirectTo = "/",
  disabled = false,
  className = "",
}) => {
  const { GoogleSignIn } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = async () => {
    if (isLoading || disabled) return;

    setIsLoading(true);

    try {
      const result = await GoogleSignIn();

      if (!result) {
        throw new Error("Google sign-in did not return a user.");
      }

      toast.success("Signed in successfully!");

      const destination = location.state?.from?.pathname || redirectTo;

      navigate(destination, { replace: true });
    } catch (error) {
      const errorMessages = {
        "auth/popup-closed-by-user": "Google sign-in was cancelled.",
        "auth/popup-blocked":
          "Your browser blocked the sign-in popup. Please allow popups and try again.",
        "auth/unauthorized-domain":
          "This domain is not authorized in Firebase.",
        "auth/operation-not-allowed":
          "Google sign-in is not enabled in Firebase.",
        "auth/network-request-failed":
          "Network error. Please check your internet connection.",
        "auth/cancelled-popup-request":
          "A Google sign-in request is already in progress.",
      };

      const message =
        errorMessages[error?.code] ||
        error?.message ||
        "Unable to sign in with Google. Please try again.";

      if (
        error?.code !== "auth/popup-closed-by-user" &&
        error?.code !== "auth/cancelled-popup-request"
      ) {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading || disabled}
        aria-label={buttonText}
        aria-busy={isLoading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-slate-600 dark:hover:bg-slate-800"
      >
        {isLoading ? (
          <>
            <span
              className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-red-600"
              aria-hidden="true"
            />
            <span>Connecting to Google...</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5 shrink-0"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.06 13.22l7.98 6.19C12.93 13.72 18.01 9.5 24 9.5Z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.64 5.93c4.46-4.13 7.13-10.2 7.13-17.58Z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59 2.55 22.4A23.9 23.9 0 0 0 0 34.78l7.98-6.19 2.55-.0Z"
                transform="translate(0 -5)"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.78l-7.64-5.93c-2.12 1.42-4.84 2.26-8.27 2.26-5.99 0-11.07-4.22-12.91-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
              />
            </svg>

            <span>{buttonText}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default GoogleLogIn;
