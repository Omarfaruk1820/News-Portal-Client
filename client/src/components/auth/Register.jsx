import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Newspaper,
  UserRound,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { user, loading: authLoading, createUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/", { replace: true });
    }
  }, [authLoading, user, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();

    if (fullName.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      setIsSubmitting(true);

      await createUser(email, formData.password, fullName);

      const destination = location.state?.from?.pathname || "/";

      navigate(destination, { replace: true });
    } catch (authError) {
      setError(
        authError?.message ||
          "Unable to create your account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-slate-800 dark:bg-slate-900";

  const iconClass =
    "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400";

  const isBusy = isSubmitting || authLoading;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-slate-950 px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between xl:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-red-900/50 via-slate-950 to-slate-950" />
          <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -right-12 top-[38%] h-56 w-56 rounded-full border border-white/10" />

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600">
                <Newspaper size={26} />
              </span>
              <span>
                <span className="block text-xl font-black tracking-tight">
                  DAILY<span className="text-red-500">PRESS</span>
                </span>
                <span className="text-xs tracking-[0.22em] text-slate-400">
                  NEWS • FACTS • PERSPECTIVE
                </span>
              </span>
            </Link>
          </div>

          <div className="relative z-10 max-w-xl py-12">
            <p className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              <span className="h-px w-8 bg-red-500" />
              Become part of our community
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-tight xl:text-6xl">
              Good journalism.
              <br />
              <span className="text-red-500">Better informed.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-slate-300 xl:text-lg">
              Create your account to personalize your reading experience, save
              important stories, and stay connected to the news that matters to
              you.
            </p>

            <div className="mt-10 space-y-5 border-t border-white/10 pt-7">
              {[
                "Save articles for later",
                "Personalize your news experience",
                "Keep up with the latest stories",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={19} className="shrink-0 text-red-400" />
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-xs text-slate-500">
            © {new Date().getFullYear()} DailyPress. All rights reserved.
          </p>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 lg:hidden"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white">
                <Newspaper size={22} />
              </span>
              <span className="text-lg font-black tracking-tight">
                DAILY<span className="text-red-600">PRESS</span>
              </span>
            </Link>

            <div className="mb-7">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-red-600">
                Join DailyPress
              </p>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Create your account
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Sign up to make your daily news experience your own.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="register-name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full name
                </label>
                <div className="relative">
                  <UserRound size={18} className={iconClass} />
                  <input
                    id="register-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={100}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="register-email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail size={18} className={iconClass} />
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="register-password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole size={18} className={iconClass} />
                  <input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="register-confirm-password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <LockKeyhole size={18} className={iconClass} />
                  <input
                    id="register-confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 pt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(event) => setAcceptTerms(event.target.checked)}
                  required
                  className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 accent-red-600"
                />
                <span>
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-semibold text-red-600 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-red-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isBusy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-red-600 hover:text-red-700"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-7 border-t border-slate-200 pt-5 text-center text-xs leading-5 text-slate-500 dark:border-slate-800">
              Your account is managed securely through Firebase Authentication.
            </p>

            <p className="mt-4 text-center text-xs text-slate-500 lg:hidden">
              © {new Date().getFullYear()} DailyPress. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
