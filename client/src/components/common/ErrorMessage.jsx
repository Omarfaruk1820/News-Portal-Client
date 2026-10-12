import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorMessage = ({
  title = "Something went wrong",
  message = "We couldn't load the news. Please try again.",
  onRetry,
  retryLabel = "Try Again",
  fullPage = false,
  className = "",
}) => {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={[
        "flex w-full items-center justify-center",
        fullPage ? "min-h-[50vh] px-4 py-10" : "py-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm dark:border-red-900/50 dark:bg-slate-900 sm:p-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400">
          <AlertCircle size={28} aria-hidden="true" />
        </div>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            <RefreshCw size={16} aria-hidden="true" />
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
