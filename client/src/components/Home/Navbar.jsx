import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Clock3,
  Sun,
  Moon,
  Radio,
  TrendingUp,
  Globe2,
  ChevronRight,
  LogIn,
  UserPlus,
  LogOut,
  UserRound,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const CATEGORIES = [
  { name: "জাতীয়", path: "/category/national" },
  { name: "রাজনীতি", path: "/category/politics" },
  { name: "আন্তর্জাতিক", path: "/category/international" },
  { name: "অর্থনীতি", path: "/category/economy" },
  { name: "খেলাধুলা", path: "/category/sports" },
  { name: "বিনোদন", path: "/category/entertainment" },
  { name: "প্রযুক্তি", path: "/category/technology" },
  { name: "শিক্ষা", path: "/category/education" },
];

const BREAKING_NEWS = [
  "সর্বশেষ সংবাদ জানতে আমাদের সঙ্গে থাকুন",
  "দেশ ও বিশ্বের গুরুত্বপূর্ণ খবর পড়ুন এক জায়গায়",
  "রাজনীতি, অর্থনীতি, খেলাধুলা ও প্রযুক্তির আপডেট",
];

const THEME_KEY = "news-portal-theme";

const getSavedTheme = () => {
  try {
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
  } catch {
    // Use light mode if localStorage is unavailable.
  }

  return "light";
};

const Navbar = () => {
  const navigate = useNavigate();

  // Assumes useAuth provides user, loading, and logout.
  const { user, loading: authLoading, logout } = useAuth();

  const [theme, setTheme] = useState(getSavedTheme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const isDark = theme === "dark";
  const isLoggedIn = Boolean(user);

  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  // Apply the theme globally and persist the preference.
  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // The current session theme still works.
    }
  }, [theme, isDark]);

  // Close mobile menu and search with Escape.
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    setSearchOpen(false);
    setSearchQuery("");
    closeMobileMenu();

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleLogout = async () => {
    if (typeof logout !== "function" || loggingOut) return;

    setLoggingOut(true);

    try {
      await logout();

      closeMobileMenu();
      setSearchOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    [
      "whitespace-nowrap border-b-2 px-3 py-4 text-sm font-semibold",
      "transition-colors duration-200",
      isActive
        ? "border-red-600 text-red-600"
        : [
            "border-transparent text-slate-700",
            "hover:border-red-500 hover:text-red-600",
            "dark:text-slate-200 dark:hover:text-red-400",
          ].join(" "),
    ].join(" ");

  const mobileLinkClass = ({ isActive }) =>
    [
      "flex items-center justify-between gap-3 rounded-lg px-4 py-3",
      "text-sm font-semibold transition-colors",
      isActive
        ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300"
        : [
            "text-slate-700 hover:bg-slate-100",
            "dark:text-slate-200 dark:hover:bg-slate-800",
          ].join(" "),
    ].join(" ");

  const authButtonClass =
    "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition-colors sm:px-4";

  const renderAuthActions = (mobile = false) => {
    if (authLoading) {
      return (
        <div
          className="h-9 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800"
          aria-label="Authentication loading"
        />
      );
    }

    if (!isLoggedIn) {
      return (
        <div
          className={
            mobile ? "grid grid-cols-2 gap-2" : "flex items-center gap-2"
          }
        >
          <Link
            to="/login"
            onClick={closeMobileMenu}
            className={`${authButtonClass} border border-slate-200 text-slate-700 hover:border-red-300 hover:text-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-red-700`}
          >
            <LogIn size={16} />
            লগইন
          </Link>

          <Link
            to="/register"
            onClick={closeMobileMenu}
            className={`${authButtonClass} bg-red-600 text-white hover:bg-red-700`}
          >
            <UserPlus size={16} />
            রেজিস্টার
          </Link>
        </div>
      );
    }

    return (
      <div
        className={
          mobile ? "grid grid-cols-2 gap-2" : "flex items-center gap-2"
        }
      >
        <div className="flex min-w-0 items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-700 dark:text-slate-200">
          <UserRound size={17} className="shrink-0" />
          <span className="max-w-28 truncate font-semibold">
            {user.displayName || user.name || user.email || "ব্যবহারকারী"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className={`${authButtonClass} border border-red-200 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900 dark:hover:bg-red-950`}
        >
          <LogOut size={16} />
          {loggingOut ? "অপেক্ষা করুন..." : "লগআউট"}
        </button>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white text-slate-900 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
      {/* Top information bar */}
      <div className="hidden border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <Clock3 size={14} />
            <span>{today}</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Globe2 size={14} />
            <span>বাংলাদেশ</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/latest"
              className="text-xs font-semibold text-slate-600 hover:text-red-600 dark:text-slate-300"
            >
              সর্বশেষ সংবাদ
            </Link>

            <Link
              to="/popular"
              className="text-xs font-semibold text-slate-600 hover:text-red-600 dark:text-slate-300"
            >
              জনপ্রিয় সংবাদ
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "লাইট মোড চালু করুন" : "ডার্ক মোড চালু করুন"}
              title={isDark ? "লাইট মোড" : "ডার্ক মোড"}
              className="rounded-full p-2 text-slate-600 transition hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main brand header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-4 sm:py-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={mobileMenuOpen}
            className="shrink-0 rounded-lg p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex min-w-0 items-center gap-2"
            aria-label="সংবাদ২৪ হোম"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-xl font-black text-white shadow-md shadow-red-600/20 sm:h-11 sm:w-11 sm:text-2xl">
              ন
            </span>

            <span className="min-w-0">
              <span className="block whitespace-nowrap text-xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                সংবাদ<span className="text-red-600">২৪</span>
              </span>
              <span className="hidden text-[11px] text-slate-500 dark:text-slate-400 sm:block">
                সত্যের পথে, সবসময় আপনার পাশে
              </span>
            </span>
          </Link>
        </div>

        <div className="hidden flex-1 justify-center lg:flex">
          <Link
            to="/latest"
            className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900"
          >
            <Radio size={16} />
            সর্বশেষ আপডেট
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            aria-label={searchOpen ? "সার্চ বন্ধ করুন" : "সার্চ খুলুন"}
            aria-expanded={searchOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 sm:h-10 sm:w-10"
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "লাইট মোড চালু করুন" : "ডার্ক মোড চালু করুন"}
            title={isDark ? "লাইট মোড" : "ডার্ক মোড"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 sm:h-10 sm:w-10"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/latest"
            className="hidden items-center gap-2 rounded-lg bg-red-600 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 xl:flex"
          >
            <TrendingUp size={17} />
            সর্বশেষ খবর
          </Link>

          {/* Always-visible desktop authentication actions */}
          <div className="hidden lg:block">{renderAuthActions()}</div>
        </div>
      </div>

      {/* Search panel */}
      {searchOpen && (
        <div className="border-t border-slate-200 bg-white px-3 py-4 dark:border-slate-800 dark:bg-slate-950 sm:px-4">
          <form
            onSubmit={handleSearch}
            role="search"
            className="mx-auto flex max-w-3xl gap-2"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 dark:border-slate-700 dark:bg-slate-900">
              <Search size={18} className="shrink-0 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="আপনি কী খুঁজছেন?"
                aria-label="সংবাদ খুঁজুন"
                className="w-full min-w-0 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="shrink-0 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700 sm:px-5"
            >
              খুঁজুন
            </button>
          </form>
        </div>
      )}

      {/* Desktop navigation: categories only for logged-in users */}
      <nav
        aria-label="প্রধান নেভিগেশন"
        className="hidden border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:block"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 lg:px-8">
          {authLoading ? (
            <div className="h-12 flex-1 animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
          ) : isLoggedIn ? (
            <>
              <div className="flex min-w-0 flex-1 items-center overflow-x-auto">
                <NavLink to="/" end className={navLinkClass}>
                  প্রচ্ছদ
                </NavLink>

                {CATEGORIES.map((category) => (
                  <NavLink
                    key={category.path}
                    to={category.path}
                    className={navLinkClass}
                  >
                    {category.name}
                  </NavLink>
                ))}
              </div>

              <Link
                to="/live"
                className="ml-2 flex shrink-0 items-center gap-2 py-4 text-sm font-bold text-red-600 hover:text-red-700"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
                লাইভ
              </Link>
            </>
          ) : (
            <div className="flex min-h-12 w-full items-center justify-between gap-3">
              <Link
                to="/"
                end="true"
                className="text-sm font-semibold text-slate-700 hover:text-red-600 dark:text-slate-200"
              >
                প্রচ্ছদ
              </Link>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                সংবাদ বিভাগ দেখতে লগইন করুন
              </p>
            </div>
          )}
        </div>
      </nav>

      {/* Breaking news marquee */}
      <div className="flex overflow-hidden border-b border-red-100 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="relative z-10 flex shrink-0 items-center gap-2 bg-red-600 px-3 py-3 text-xs font-bold text-white sm:px-5 sm:text-sm">
          <Radio size={16} className="shrink-0" />
          <span className="whitespace-nowrap">ব্রেকিং নিউজ</span>
        </div>

        <div
          className="group flex min-w-0 flex-1 items-center overflow-hidden"
          aria-label="ব্রেকিং নিউজ"
        >
          <div className="news-marquee-track flex w-max shrink-0 items-center group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-center"
                aria-hidden={copy === 1 ? "true" : undefined}
              >
                {BREAKING_NEWS.map((news, index) => (
                  <Link
                    key={`${copy}-${index}`}
                    to="/latest"
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="inline-flex items-center gap-3 whitespace-nowrap px-4 py-3 text-xs font-medium text-slate-700 transition hover:text-red-600 dark:text-slate-200 sm:px-5 sm:text-sm"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                    {news}
                    <span className="text-slate-300 dark:text-slate-700">
                      |
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <nav
            aria-label="মোবাইল নেভিগেশন"
            className="space-y-1 px-3 py-3 sm:px-4"
          >
            <NavLink
              to="/"
              end
              onClick={closeMobileMenu}
              className={mobileLinkClass}
            >
              প্রচ্ছদ
              <ChevronRight size={16} />
            </NavLink>

            {authLoading ? (
              <div className="space-y-2 p-3">
                <div className="h-8 animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
                <div className="h-8 animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
              </div>
            ) : isLoggedIn ? (
              <>
                {CATEGORIES.map((category) => (
                  <NavLink
                    key={category.path}
                    to={category.path}
                    onClick={closeMobileMenu}
                    className={mobileLinkClass}
                  >
                    {category.name}
                    <ChevronRight size={16} />
                  </NavLink>
                ))}

                <NavLink
                  to="/live"
                  onClick={closeMobileMenu}
                  className={mobileLinkClass}
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
                    লাইভ
                  </span>
                  <ChevronRight size={16} />
                </NavLink>
              </>
            ) : (
              <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                সংবাদ বিভাগ দেখতে লগইন অথবা রেজিস্টার করুন।
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 border-t border-slate-200 pt-3 dark:border-slate-800">
              <Link
                to="/latest"
                onClick={closeMobileMenu}
                className="rounded-lg bg-red-600 px-3 py-3 text-center text-sm font-bold text-white hover:bg-red-700"
              >
                সর্বশেষ সংবাদ
              </Link>

              <Link
                to="/popular"
                onClick={closeMobileMenu}
                className="rounded-lg border border-slate-200 px-3 py-3 text-center text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                জনপ্রিয় সংবাদ
              </Link>
            </div>

            {/* Authentication buttons on mobile */}
            <div className="border-t border-slate-200 pt-3 dark:border-slate-800">
              {renderAuthActions(true)}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {today}
              </span>

              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
                {isDark ? "লাইট মোড" : "ডার্ক মোড"}
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Marquee animation */}
      <style>{`
        .news-marquee-track {
          animation: news-portal-marquee 32s linear infinite;
          will-change: transform;
        }

        @keyframes news-portal-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .news-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
