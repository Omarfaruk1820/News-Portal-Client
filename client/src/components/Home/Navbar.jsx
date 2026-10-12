import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
} from "lucide-react";

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

const getSavedTheme = () => {
  try {
    const savedTheme = localStorage.getItem("news-portal-theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
  } catch {
    // Continue with the default theme if storage is unavailable.
  }

  return "light";
};

const Navbar = () => {
  const [theme, setTheme] = useState(getSavedTheme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isDark = theme === "dark";

  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";

    try {
      localStorage.setItem("news-portal-theme", theme);
    } catch {
      // Theme still works for the current session.
    }
  }, [theme, isDark]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    window.location.href = `/search?q=${encodeURIComponent(query)}`;
    setSearchOpen(false);
    setSearchQuery("");
  };

  const navLinkClass = ({ isActive }) =>
    [
      "whitespace-nowrap border-b-2 px-3 py-4 text-sm font-semibold transition-colors",
      isActive
        ? "border-red-600 text-red-600"
        : "border-transparent text-slate-700 hover:border-red-500 hover:text-red-600 dark:text-slate-200",
    ].join(" ");

  const mobileLinkClass = ({ isActive }) =>
    [
      "flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-colors",
      isActive
        ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300"
        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
    ].join(" ");

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

          <div className="flex items-center gap-4">
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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={mobileMenuOpen}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
          >
            {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex min-w-0 items-center gap-2"
            aria-label="সংবাদ২৪ হোম"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-2xl font-black text-white shadow-md shadow-red-600/20">
              ন
            </span>

            <span className="min-w-0">
              <span className="block whitespace-nowrap text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl">
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

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            aria-label={searchOpen ? "সার্চ বন্ধ করুন" : "সার্চ খুলুন"}
            aria-expanded={searchOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "লাইট মোড চালু করুন" : "ডার্ক মোড চালু করুন"}
            title={isDark ? "লাইট মোড" : "ডার্ক মোড"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <Link
            to="/latest"
            className="hidden items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 sm:flex"
          >
            <TrendingUp size={17} />
            সর্বশেষ খবর
          </Link>
        </div>
      </div>

      {/* Search panel */}
      {searchOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950">
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
                className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              খুঁজুন
            </button>
          </form>
        </div>
      )}

      {/* Desktop category navigation */}
      <nav
        aria-label="প্রধান নেভিগেশন"
        className="hidden border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:block"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex min-w-0 items-center overflow-x-auto">
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
            className="ml-3 flex shrink-0 items-center gap-2 py-4 text-sm font-bold text-red-600 hover:text-red-700"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
            লাইভ
          </Link>
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
                    className="inline-flex items-center gap-3 whitespace-nowrap px-5 py-3 text-xs font-medium text-slate-700 transition hover:text-red-600 dark:text-slate-200 sm:text-sm"
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

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <nav aria-label="মোবাইল নেভিগেশন" className="space-y-1 px-4 py-3">
            <NavLink
              to="/"
              end
              onClick={closeMobileMenu}
              className={mobileLinkClass}
            >
              প্রচ্ছদ
              <ChevronRight size={16} />
            </NavLink>

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

            <div className="flex items-center justify-between gap-3 pt-3">
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
