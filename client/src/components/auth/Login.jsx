import { useEffect, useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Newspaper,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { user, loading: authLoading, signIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const email = formData.email.trim();

    if (!email || !formData.password) {
      setError("Please enter your email address and password.");
      return;
    }

    try {
      setIsSubmitting(true);

      await signIn(email, formData.password, rememberMe);

      const destination = location.state?.from?.pathname || "/";

      navigate(destination, { replace: true });
    } catch (authError) {
      setError(
        authError?.message ||
          "Unable to sign in. Please check your details and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              <span className="h-px w-8 bg-red-500" />
              Journalism you can trust
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight xl:text-6xl">
              Stay informed.
              <br />
              <span className="text-red-500">Stay ahead.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-slate-300 xl:text-lg">
              Your daily briefing on the stories shaping your world. Sign in to
              continue reading, save articles, and make your news experience
              personal.
            </p>

            <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                <ShieldCheck className="text-red-400" size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  Your account, your reading
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  A personalized news experience
                </p>
              </div>
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
              className="mb-10 inline-flex items-center gap-2 lg:hidden"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white">
                <Newspaper size={22} />
              </span>
              <span className="text-lg font-black tracking-tight">
                DAILY<span className="text-red-600">PRESS</span>
              </span>
            </Link>

            <div className="mb-8">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-red-600">
                Welcome back
              </p>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Sign in to your account
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Access your saved stories and personalized news feed.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-slate-800 dark:bg-slate-900"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-semibold"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-red-600 hover:text-red-700"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-slate-800 dark:bg-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 accent-red-600"
                />
                Keep me signed in
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
                {isSubmitting ? "Signing in..." : "Sign in"}
                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-red-600 hover:text-red-700"
              >
                Create an account
              </Link>
            </p>

            <div className="mt-8 flex items-center justify-center gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800">
              <ShieldCheck size={15} />
              Secure access to your news account
            </div>

            <p className="mt-6 text-center text-xs text-slate-500 lg:hidden">
              © {new Date().getFullYear()} DailyPress. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
