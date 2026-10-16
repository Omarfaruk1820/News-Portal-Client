import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock3, Flame, TrendingUp } from "lucide-react";

import FeaturedNews from "../news/FeaturedNews";
import ErrorMessage from "../common/ErrorMessage";

const MAX_SIDE_NEWS = 4;

const formatPublishedDate = (date) => {
  if (!date) return "Latest update";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Latest update";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
};

const getArticlePath = (article) => {
  if (!article || typeof article !== "object") return null;

  if (article.slug) {
    return `/news/${encodeURIComponent(article.slug)}`;
  }

  if (article._id) {
    return `/news/${encodeURIComponent(article._id)}`;
  }

  return null;
};

const getImageKey = (article, index) =>
  String(article?._id || article?.slug || `headline-${index}`);

const HeroSkeleton = () => (
  <section
    aria-label="Loading top stories"
    aria-busy="true"
    className="bg-white py-6 dark:bg-slate-950 sm:py-8 lg:py-10"
  >
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div className="mb-3 h-3 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-9 w-48 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 lg:col-span-8">
          <div className="aspect-[16/10] animate-pulse bg-slate-200 dark:bg-slate-800 sm:aspect-[16/9]" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-6 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
          </div>
        </div>

        <div className="space-y-4 lg:col-span-4">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="flex gap-3 border-b border-slate-200 pb-4 dark:border-slate-800"
            >
              <div className="h-24 w-28 shrink-0 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="flex-1 space-y-3">
                <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Hero = ({
  featuredNews = null,
  sideNews = [],
  loading = false,
  error = null,
  onRetry,
  onReadMore,
  onNewsClick,
  className = "",
}) => {
  const [failedImages, setFailedImages] = useState({});

  if (loading) {
    return <HeroSkeleton />;
  }

  if (error) {
    const message =
      typeof error === "string"
        ? error
        : error.message || "Please try again in a moment.";

    return (
      <section className="bg-white px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ErrorMessage
            title="Unable to load top stories"
            message={message}
            onRetry={onRetry}
            retryLabel="Try again"
          />
        </div>
      </section>
    );
  }

  const validFeaturedNews =
    featuredNews && typeof featuredNews === "object" ? featuredNews : null;

  const headlines = Array.isArray(sideNews)
    ? sideNews
        .filter(
          (article) =>
            article && typeof article === "object" && getArticlePath(article),
        )
        .slice(0, MAX_SIDE_NEWS)
    : [];

  return (
    <section
      aria-labelledby="hero-heading"
      className={`bg-white py-6 text-slate-900 dark:bg-slate-950 dark:text-white sm:py-8 lg:py-10 ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800 sm:mb-7">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1 w-7 rounded-full bg-red-600"
              />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 dark:text-red-500">
                The Daily Brief
              </span>
            </div>

            <h1
              id="hero-heading"
              className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl"
            >
              Top Stories<span className="text-red-600">.</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              The latest headlines, important developments, and stories worth
              your attention.
            </p>
          </div>

          <div className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:flex">
            <Flame size={16} className="text-red-600" />
            Editor&apos;s Picks
          </div>
        </div>

        {/* Main responsive layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-7">
          {/* Main featured article */}
          <div className="min-w-0 lg:col-span-8">
            {validFeaturedNews ? (
              <FeaturedNews
                article={validFeaturedNews}
                onReadMore={onReadMore}
              />
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 px-5 py-10 text-center dark:border-slate-700">
                <Flame
                  size={30}
                  className="mb-3 text-slate-400"
                  aria-hidden="true"
                />
                <h2 className="text-lg font-bold">
                  No featured story available
                </h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Our top story will appear here when a published article is
                  available.
                </p>
              </div>
            )}
          </div>

          {/* Secondary headlines */}
          <aside
            aria-labelledby="more-stories-heading"
            className="flex min-w-0 flex-col lg:col-span-4"
          >
            <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
              <h2
                id="more-stories-heading"
                className="flex items-center gap-2 text-lg font-extrabold tracking-tight sm:text-xl"
              >
                <TrendingUp size={20} className="text-red-600" />
                More Headlines
              </h2>

              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Top picks
              </span>
            </div>

            {headlines.length > 0 ? (
              <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-800">
                {headlines.map((article, index) => {
                  const imageKey = getImageKey(article, index);
                  const imageFailed = Boolean(failedImages[imageKey]);
                  const articlePath = getArticlePath(article);

                  return (
                    <article
                      key={imageKey}
                      className="group py-4 first:pt-0 last:pb-0"
                    >
                      <Link
                        to={articlePath}
                        onClick={(event) => {
                          if (typeof onNewsClick === "function") {
                            event.preventDefault();
                            onNewsClick(article);
                          }
                        }}
                        className="flex items-start gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:gap-4"
                      >
                        <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-28 sm:w-32">
                          {article.image && !imageFailed ? (
                            <img
                              src={article.image}
                              alt={article.title || "News thumbnail"}
                              loading="lazy"
                              decoding="async"
                              onError={() =>
                                setFailedImages((previous) => ({
                                  ...previous,
                                  [imageKey]: true,
                                }))
                              }
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div
                              role="img"
                              aria-label="News image unavailable"
                              className="flex h-full items-center justify-center px-2 text-center text-xs text-slate-500 dark:text-slate-400"
                            >
                              Image unavailable
                            </div>
                          )}

                          <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-md bg-black/70 text-xs font-extrabold text-white backdrop-blur-sm">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col">
                          {article.category && (
                            <span className="mb-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-red-600 dark:text-red-500 sm:text-[11px]">
                              {article.category}
                            </span>
                          )}

                          <h3 className="line-clamp-3 text-sm font-bold leading-5 text-slate-900 transition-colors group-hover:text-red-600 sm:text-base sm:leading-6 dark:text-slate-100 dark:group-hover:text-red-400">
                            {article.title || "Untitled news story"}
                          </h3>

                          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                            <Clock3 size={12} aria-hidden="true" />
                            <time dateTime={article.publishedAt || undefined}>
                              {formatPublishedDate(article.publishedAt)}
                            </time>

                            {article.readTime && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{article.readTime}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                More headlines will appear here when published news is
                available.
              </p>
            )}

            <Link
              to="/latest-news"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:border-slate-800 dark:text-slate-200 dark:hover:border-red-900 dark:hover:bg-slate-900 dark:hover:text-red-400"
            >
              Explore All Headlines
              <ArrowRight size={17} />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Hero;
