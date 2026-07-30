function AnalyticsCard({ title, value }) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-lg
      "
    >
      <div
        className="
          absolute
          top-0
          left-0
          h-1
          w-full
          bg-blue-600
        "
      />

      <div className="flex flex-col gap-3">
        <p
          className="
            text-sm
            font-medium
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          {title}
        </p>

        <p
          className="
            break-words
            text-4xl
            font-bold
            tracking-tight
            text-slate-900
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default AnalyticsCard;