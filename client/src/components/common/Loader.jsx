import { LoaderCircle } from "lucide-react";

const Loader = ({
  text = "Loading news...",
  size = "md",
  fullPage = false,
  className = "",
}) => {
  const spinnerSizes = {
    sm: 20,
    md: 32,
    lg: 44,
  };

  const spinnerSize = spinnerSizes[size] || spinnerSizes.md;

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "flex w-full flex-col items-center justify-center gap-3",
        fullPage ? "min-h-[50vh] px-4 py-10" : "py-10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <LoaderCircle
        size={spinnerSize}
        strokeWidth={2.5}
        aria-hidden="true"
        className="animate-spin text-red-600 dark:text-red-500"
      />

      {text && (
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {text}
        </p>
      )}

      <span className="sr-only">Loading, please wait.</span>
    </div>
  );
};

export default Loader;
