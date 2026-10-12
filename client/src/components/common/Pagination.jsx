import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,
  className = "",
}) => {
  const safeTotalPages = Math.max(1, Math.floor(totalPages || 1));
  const safeCurrentPage = Math.min(
    safeTotalPages,
    Math.max(1, Math.floor(currentPage || 1)),
  );

  const safeSiblingCount = Math.max(
    0,
    Math.min(2, Math.floor(siblingCount || 0)),
  );

  const getPageNumbers = () => {
    const totalNumbers = safeSiblingCount * 2 + 5;

    if (safeTotalPages <= totalNumbers) {
      return Array.from({ length: safeTotalPages }, (_, index) => index + 1);
    }

    const leftSibling = Math.max(safeCurrentPage - safeSiblingCount, 1);

    const rightSibling = Math.min(
      safeCurrentPage + safeSiblingCount,
      safeTotalPages,
    );

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < safeTotalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + safeSiblingCount * 2;

      return [
        ...Array.from({ length: leftItemCount }, (_, index) => index + 1),
        "...",
        safeTotalPages,
      ];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + safeSiblingCount * 2;
      const startPage = safeTotalPages - rightItemCount + 1;

      return [
        1,
        "...",
        ...Array.from(
          { length: rightItemCount },
          (_, index) => startPage + index,
        ),
      ];
    }

    return [
      1,
      "...",
      ...Array.from(
        {
          length: rightSibling - leftSibling + 1,
        },
        (_, index) => leftSibling + index,
      ),
      "...",
      safeTotalPages,
    ];
  };

  const goToPage = (page) => {
    if (
      typeof onPageChange !== "function" ||
      page < 1 ||
      page > safeTotalPages ||
      page === safeCurrentPage
    ) {
      return;
    }

    onPageChange(page);
  };

  const baseButton =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-xl " +
    "border px-3 text-sm font-semibold transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-red-500 focus-visible:ring-offset-2 " +
    "disabled:pointer-events-none disabled:opacity-40 " +
    "dark:focus-visible:ring-offset-slate-950";

  const inactiveButton =
    "border-slate-200 bg-white text-slate-700 hover:border-red-300 " +
    "hover:bg-red-50 hover:text-red-700 " +
    "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 " +
    "dark:hover:border-red-700 dark:hover:bg-slate-800";

  const activeButton = "border-red-600 bg-red-600 text-white shadow-sm";

  if (safeTotalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="News pagination"
      className={["flex w-full justify-center", className]
        .filter(Boolean)
        .join(" ")}
    >
      <ul className="flex max-w-full flex-wrap items-center justify-center gap-2">
        <li>
          <button
            type="button"
            aria-label="Go to previous page"
            disabled={safeCurrentPage === 1}
            onClick={() => goToPage(safeCurrentPage - 1)}
            className={`${baseButton} ${inactiveButton}`}
          >
            <ChevronLeft size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </button>
        </li>

        {getPageNumbers().map((page, index) => (
          <li key={`${page}-${index}`}>
            {page === "..." ? (
              <span
                aria-hidden="true"
                className="inline-flex h-10 min-w-6 items-center justify-center text-slate-500"
              >
                ...
              </span>
            ) : (
              <button
                type="button"
                aria-label={`Go to page ${page}`}
                aria-current={page === safeCurrentPage ? "page" : undefined}
                onClick={() => goToPage(page)}
                className={`${baseButton} ${
                  page === safeCurrentPage ? activeButton : inactiveButton
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            type="button"
            aria-label="Go to next page"
            disabled={safeCurrentPage === safeTotalPages}
            onClick={() => goToPage(safeCurrentPage + 1)}
            className={`${baseButton} ${inactiveButton}`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
