function EmptyState({
  title = "No data available",
  message = "There is no information to display yet.",
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17v-6h13M9 5v6h13M5 5h.01M5 12h.01M5 19h.01"
          />
        </svg>
      </div>

      <h2 className="mt-5 text-xl font-semibold text-slate-800">
        {title}
      </h2>

      <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;