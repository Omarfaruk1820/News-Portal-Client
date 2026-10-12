import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUp,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Globe,
  Newspaper,
  ChevronRight,
} from "lucide-react";

const categories = [
  { label: "জাতীয়", path: "/category/national" },
  { label: "রাজনীতি", path: "/category/politics" },
  { label: "আন্তর্জাতিক", path: "/category/international" },
  { label: "অর্থনীতি", path: "/category/economy" },
  { label: "খেলাধুলা", path: "/category/sports" },
  { label: "বিনোদন", path: "/category/entertainment" },
  { label: "প্রযুক্তি", path: "/category/technology" },
  { label: "শিক্ষা", path: "/category/education" },
];

const quickLinks = [
  { label: "প্রচ্ছদ", path: "/" },
  { label: "সর্বশেষ সংবাদ", path: "/latest" },
  { label: "জনপ্রিয় সংবাদ", path: "/popular" },
  { label: "আমাদের সম্পর্কে", path: "/about" },
  { label: "যোগাযোগ", path: "/contact" },
  { label: "গোপনীয়তা নীতি", path: "/privacy-policy" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: "f",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: "◎",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    icon: "▶",
  },
];

const Footer = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleInternalNavigation = (path) => {
    if (location.pathname === path) {
      scrollToTop();
    }
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setMessage("আপনার ইমেইল ঠিকানা লিখুন।");
      return;
    }

    // Connect this form to your newsletter API before production use.
    setMessage(
      "ধন্যবাদ! Newsletter API সংযুক্ত হলে আপনার সাবস্ক্রিপশন সম্পন্ন হবে।",
    );
    setEmail("");
  };

  const InternalLink = ({ to, children, className = "" }) => (
    <Link
      to={to}
      onClick={() => handleInternalNavigation(to)}
      className={className}
    >
      {children}
    </Link>
  );

  return (
    <footer className="relative mt-16 overflow-hidden bg-slate-950 text-slate-300">
      {/* Top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-red-700 via-red-500 to-orange-400" />

      {/* Newsletter banner */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-14">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-600/20">
              <Mail size={23} />
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                Newsletter
              </p>
              <h2 className="text-xl font-extrabold leading-snug text-white sm:text-2xl">
                গুরুত্বপূর্ণ খবর থাকুক আপনার হাতেই
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">
                প্রতিদিনের গুরুত্বপূর্ণ সংবাদ ও বিশেষ আপডেট পেতে আমাদের
                নিউজলেটারে যুক্ত থাকুন।
              </p>
            </div>
          </div>

          <div className="w-full">
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">
                আপনার ইমেইল ঠিকানা
              </label>

              <input
                id="footer-newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setMessage("");
                }}
                placeholder="আপনার ইমেইল ঠিকানা"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                সাবস্ক্রাইব
                <Send size={16} />
              </button>
            </form>

            {message && (
              <p
                role="status"
                className="mt-3 text-xs leading-5 text-slate-300"
              >
                {message}
              </p>
            )}

            <p className="mt-3 text-xs text-slate-500">
              আপনার ব্যক্তিগত তথ্যের গোপনীয়তা আমরা গুরুত্বের সঙ্গে দেখি।
            </p>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand and description */}
          <div className="sm:col-span-2 lg:col-span-4">
            <InternalLink to="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-2xl font-black text-white shadow-lg shadow-red-600/20">
                ন
              </span>

              <span>
                <span className="block text-2xl font-black tracking-tight text-white sm:text-3xl">
                  সংবাদ<span className="text-red-500">২৪</span>
                </span>
                <span className="mt-1 block text-[11px] tracking-wide text-slate-500">
                  সত্যের পথে, সবসময় আপনার পাশে
                </span>
              </span>
            </InternalLink>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              দেশ ও বিশ্বের সর্বশেষ সংবাদ, বিশ্লেষণ ও গুরুত্বপূর্ণ ঘটনাবলি
              পাঠকের কাছে নির্ভরযোগ্যভাবে পৌঁছে দেওয়াই আমাদের লক্ষ্য।
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg font-bold text-slate-300 transition hover:border-red-500 hover:bg-red-600 hover:text-white"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 flex items-center gap-2 text-base font-bold text-white">
              <Newspaper size={18} className="text-red-500" />
              সংবাদ বিভাগ
            </h3>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-4">
              {categories.map((category) => (
                <li key={category.path}>
                  <InternalLink
                    to={category.path}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white"
                  >
                    <ChevronRight
                      size={14}
                      className="shrink-0 text-red-500 transition-transform group-hover:translate-x-1"
                    />
                    {category.label}
                  </InternalLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-base font-bold text-white">
              প্রয়োজনীয় লিংক
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <InternalLink
                    to={item.path}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white"
                  >
                    <ChevronRight
                      size={14}
                      className="shrink-0 text-red-500 transition-transform group-hover:translate-x-1"
                    />
                    {item.label}
                  </InternalLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 text-base font-bold text-white">
              যোগাযোগ করুন
            </h3>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-red-400">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">অফিস</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    বাংলাদেশ
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-red-400">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">ইমেইল</p>
                  <a
                    href="mailto:info@example.com"
                    className="mt-1 block break-all text-sm text-slate-400 transition hover:text-white"
                  >
                    info@example.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-red-400">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">ফোন</p>
                  <a
                    href="tel:+8801000000000"
                    className="mt-1 block text-sm text-slate-400 transition hover:text-white"
                  >
                    +880 1000-000000
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-red-400">
                  <Clock size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    সংবাদ বিভাগ
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    পাঠকের জন্য, প্রতিদিন
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Editorial statement */}
      <div className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-start gap-2 text-xs leading-6 text-slate-500">
            <Globe size={16} className="mt-1 shrink-0 text-red-500" />
            <p>
              সংবাদ প্রকাশে নির্ভুলতা, দায়িত্বশীলতা ও পাঠকের আস্থাকে আমরা
              অগ্রাধিকার দিই।
            </p>
          </div>

          <Link
            to="/about"
            onClick={() => handleInternalNavigation("/about")}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-300 transition hover:text-red-400"
          >
            আরও জানুন
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Copyright and back to top */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-center text-xs leading-6 text-slate-500 md:text-left">
            © {new Date().getFullYear()} সংবাদ২৪। সর্বস্বত্ব সংরক্ষিত।
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <InternalLink
              to="/privacy-policy"
              className="text-xs text-slate-500 transition hover:text-white"
            >
              গোপনীয়তা নীতি
            </InternalLink>

            <InternalLink
              to="/terms"
              className="text-xs text-slate-500 transition hover:text-white"
            >
              ব্যবহারের শর্তাবলি
            </InternalLink>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:border-red-500 hover:bg-red-600"
            >
              উপরে যান
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
