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
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>

      <p className="mt-3 text-4xl font-bold tracking-tight text-blue-600">
        {value}
      </p>
    </div>
  );
}

export default AnalyticsCard;
