import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Flame,
  TrendingUp,
} from "lucide-react";

import Button from "../common/Button";
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

const getImageKey = (article, fallback = "article") =>
  String(article?._id || article?.slug || fallback);

const getAuthorInitial = (author) => {
  if (typeof author !== "string" || !author.trim()) {
    return "N";
  }

  return author.trim().charAt(0).toUpperCase();
};

const ImageFallback = ({ label = "Image unavailable" }) => (
  <div
    role="img"
    aria-label={label}
    className="flex h-full w-full items-center justify-center bg-slate-200 px-3 text-center text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400"
  >
    {label}
  </div>
);

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
  const navigate = useNavigate();
  const [failedImages, setFailedImages] = useState({});

  const markImageAsFailed = (imageKey) => {
    setFailedImages((previous) => ({
      ...previous,
      [imageKey]: true,
    }));
  };

  const openArticle = (article) => {
    if (typeof onReadMore === "function") {
      onReadMore(article);
      return;
    }

    const destination = getArticlePath(article);

    if (destination) {
      navigate(destination);
    }
  };

  const handleSideNewsClick = (event, article) => {
    if (typeof onNewsClick === "function") {
      event.preventDefault();
      onNewsClick(article);
    }
  };

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

  // Do not show fake news when the database has no published articles.
  if (!validFeaturedNews) {
    return (
      <section
        aria-labelledby="hero-heading"
        className={`bg-white py-8 text-slate-900 dark:bg-slate-950 dark:text-white sm:py-10 ${className}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="hero-heading"
            className="text-2xl font-black tracking-tight sm:text-3xl"
          >
            Top Stories<span className="text-red-600">.</span>
          </h2>

          <p className="mt-3 rounded-xl border border-dashed border-slate-300 px-5 py-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No featured news is available right now. Please check back soon.
          </p>
        </div>
      </section>
    );
  }

  const featuredTitle =
    typeof validFeaturedNews.title === "string" &&
    validFeaturedNews.title.trim()
      ? validFeaturedNews.title
      : "Featured news story";

  const featuredPath = getArticlePath(validFeaturedNews);
  const featuredImageKey = getImageKey(validFeaturedNews, "featured");
  const featuredImageFailed = Boolean(failedImages[featuredImageKey]);

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

            <h2
              id="hero-heading"
              className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl"
            >
              Top Stories<span className="text-red-600">.</span>
            </h2>

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

        {/* Featured news and secondary headlines */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
          {/* Featured article */}
          <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 lg:col-span-8">
            <div className="relative">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800 sm:aspect-[16/9]">
                {validFeaturedNews.image && !featuredImageFailed ? (
                  <img
                    src={validFeaturedNews.image}
                    alt={featuredTitle}
                    onError={() => markImageAsFailed(featuredImageKey)}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <ImageFallback label="Featured image unavailable" />
                )}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"
                />

                <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 sm:left-6 sm:top-6">
                  <span className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-white shadow-lg sm:text-xs">
                    <Flame size={14} />
                    Featured Story
                  </span>

                  {validFeaturedNews.category && (
                    <span className="rounded-md border border-white/30 bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm sm:text-xs">
                      {validFeaturedNews.category}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                  <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-white/85">
                    {validFeaturedNews.author && (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold text-white"
                        >
                          {getAuthorInitial(validFeaturedNews.author)}
                        </span>
                        {validFeaturedNews.author}
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={14} />
                      <time
                        dateTime={validFeaturedNews.publishedAt || undefined}
                      >
                        {formatPublishedDate(validFeaturedNews.publishedAt)}
                      </time>
                    </span>
                  </div>

                  {featuredPath ? (
                    <Link
                      to={featuredPath}
                      onClick={(event) => {
                        if (typeof onReadMore === "function") {
                          event.preventDefault();
                          onReadMore(validFeaturedNews);
                        }
                      }}
                      className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <h3 className="max-w-3xl text-2xl font-black leading-tight tracking-tight text-white transition-colors group-hover:text-red-100 sm:text-3xl lg:text-4xl xl:text-[2.7rem]">
                        {featuredTitle}
                      </h3>
                    </Link>
                  ) : (
                    <h3 className="max-w-3xl text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                      {featuredTitle}
                    </h3>
                  )}

                  {validFeaturedNews.summary && (
                    <p className="mt-3 hidden max-w-2xl text-sm leading-6 text-white/85 sm:line-clamp-2 md:block lg:text-base">
                      {validFeaturedNews.summary}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {featuredPath ? (
                      <Link
                        to={featuredPath}
                        onClick={(event) => {
                          if (typeof onReadMore === "function") {
                            event.preventDefault();
                            onReadMore(validFeaturedNews);
                          }
                        }}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        Read the full story
                        <ArrowUpRight
                          size={17}
                          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openArticle(validFeaturedNews)}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        Read the full story
                        <ArrowUpRight size={17} />
                      </button>
                    )}

                    {validFeaturedNews.readTime && (
                      <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                        {validFeaturedNews.readTime}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Featured article footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                In-depth coverage from our newsroom
              </span>

              {featuredPath && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  rightIcon={<ArrowRight size={16} />}
                  onClick={() => openArticle(validFeaturedNews)}
                >
                  Read Full Story
                </Button>
              )}
            </div>
          </article>

          {/* Secondary headlines */}
          <aside
            aria-labelledby="more-stories-heading"
            className="flex min-w-0 flex-col lg:col-span-4"
          >
            <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
              <h3
                id="more-stories-heading"
                className="flex items-center gap-2 text-lg font-extrabold tracking-tight sm:text-xl"
              >
                <TrendingUp size={20} className="text-red-600" />
                More Headlines
              </h3>

              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Top picks
              </span>
            </div>

            {headlines.length > 0 ? (
              <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-800">
                {headlines.map((article, index) => {
                  const imageKey = getImageKey(article, `side-${index}`);
                  const imageFailed = Boolean(failedImages[imageKey]);
                  const articlePath = getArticlePath(article);

                  return (
                    <article
                      key={imageKey}
                      className="group py-4 first:pt-0 last:pb-0"
                    >
                      <Link
                        to={articlePath}
                        onClick={(event) => handleSideNewsClick(event, article)}
                        className="flex items-start gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:gap-4"
                      >
                        <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-28 sm:w-32 dark:bg-slate-800">
                          {article.image && !imageFailed ? (
                            <img
                              src={article.image}
                              alt={article.title || "News thumbnail"}
                              loading="lazy"
                              decoding="async"
                              onError={() => markImageAsFailed(imageKey)}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <ImageFallback label="Image unavailable" />
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

                          <h4 className="line-clamp-3 text-sm font-bold leading-5 text-slate-900 transition-colors group-hover:text-red-600 sm:text-base sm:leading-6 dark:text-slate-100 dark:group-hover:text-red-400">
                            {article.title || "Untitled news story"}
                          </h4>

                          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
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
                More headlines will appear here soon.
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
