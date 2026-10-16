import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Clock3, Flame } from "lucide-react";

import Button from "../common/Button";

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

const FeaturedNews = ({ article = null, onReadMore, className = "" }) => {
  const navigate = useNavigate();
  const [imageFailed, setImageFailed] = useState(false);

  if (!article || typeof article !== "object") {
    return null;
  }

  const title =
    typeof article.title === "string" && article.title.trim()
      ? article.title
      : "Untitled news story";

  const articlePath = getArticlePath(article);

  const handleReadMore = (event) => {
    if (typeof onReadMore === "function") {
      event?.preventDefault();
      onReadMore(article);
      return;
    }

    if (!articlePath) {
      event?.preventDefault();
      return;
    }

    // Links navigate normally. Buttons use navigate().
    if (event?.currentTarget?.tagName === "BUTTON") {
      navigate(articlePath);
    }
  };

  return (
    <article
      className={`group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {/* Featured image and overlay */}
      <div className="relative isolate aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-slate-800 sm:aspect-[16/9] lg:aspect-[16/10] xl:aspect-[16/9]">
        {article.image && !imageFailed ? (
          <img
            src={article.image}
            alt={title}
            fetchPriority="high"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            role="img"
            aria-label="Featured image unavailable"
            className="absolute inset-0 flex items-center justify-center bg-slate-200 px-4 text-center text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400"
          >
            Featured image unavailable
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"
        />

        {/* Category labels */}
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 sm:left-6 sm:top-6">
          <span className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-lg sm:text-xs">
            <Flame size={14} />
            Featured Story
          </span>

          {article.category && (
            <span className="rounded-md border border-white/30 bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm sm:text-xs">
              {article.category}
            </span>
          )}
        </div>

        {/* Article information */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-7 xl:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-white/85">
            {article.author && (
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white"
                >
                  {String(article.author).trim().charAt(0).toUpperCase() || "N"}
                </span>
                <span className="max-w-40 truncate">{article.author}</span>
              </span>
            )}

            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={14} />
              <time dateTime={article.publishedAt || undefined}>
                {formatPublishedDate(article.publishedAt)}
              </time>
            </span>
          </div>

          {articlePath ? (
            <Link
              to={articlePath}
              onClick={(event) => {
                if (typeof onReadMore === "function") {
                  event.preventDefault();
                  onReadMore(article);
                }
              }}
              className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <h2 className="max-w-3xl text-2xl font-black leading-tight tracking-tight text-white transition-colors group-hover:text-red-100 sm:text-3xl lg:text-4xl xl:text-[2.7rem]">
                {title}
              </h2>
            </Link>
          ) : (
            <h2 className="max-w-3xl text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              {title}
            </h2>
          )}

          {article.summary && (
            <p className="mt-3 hidden max-w-2xl text-sm leading-6 text-white/85 sm:line-clamp-2 md:block lg:text-base">
              {article.summary}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {articlePath ? (
              <Link
                to={articlePath}
                onClick={(event) => {
                  if (typeof onReadMore === "function") {
                    event.preventDefault();
                    onReadMore(article);
                  }
                }}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Read Full Story
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            ) : (
              <span className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white">
                Featured Story
              </span>
            )}

            {article.readTime && (
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                {article.readTime}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          In-depth coverage from our newsroom
        </span>

        {articlePath && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleReadMore}
            rightIcon={<ArrowUpRight size={16} />}
          >
            Read Article
          </Button>
        )}
      </div>
    </article>
  );
};

export default FeaturedNews;
