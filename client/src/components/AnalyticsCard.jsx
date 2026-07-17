function AnalyticsCard({ title, value }) {
  return (
    <div
      className="
      rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:shadow-md
    "
    >
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>

      <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default AnalyticsCard;
