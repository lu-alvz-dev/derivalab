function AnalyticsCard({ title, value }) {
  return (
    <div
      className="
      bg-white
    rounded-2xl
    shadow-md
    p-6
    transition-shadow
    hover:shadow-lg
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
