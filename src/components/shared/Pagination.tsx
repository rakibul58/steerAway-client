type TPagination = {
  page: number;
  totalPage: number;
  setPage: (page: number) => void;
};

const Pagination = ({ page, totalPage, setPage }: TPagination) => {
  return (
    <div className="inline-flex items-center justify-center gap-3">
      <button
        disabled={page === 1 ? true : false}
        onClick={() => {
          if (page > 1) setPage(page - 1);
        }}
        className="inline-flex size-8 items-center justify-center rounded border-2 hover:bg-secondary rtl:rotate-180 disabled:bg-stone-50 disabled:dark:bg-stone-600"
      >
        <span className="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <p className="text-xs">
        {page}
        <span className="mx-0.25">/</span>
        {!totalPage ? 1 : totalPage}
      </p>

      <button
        disabled={page === totalPage ? true : false}
        onClick={() => {
          if (page < totalPage) setPage(page + 1);
        }}
        className="inline-flex size-8 items-center justify-center rounded border-2 hover:bg-secondary rtl:rotate-180 disabled:bg-stone-50 disabled:dark:bg-stone-600"
      >
        <span className="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
