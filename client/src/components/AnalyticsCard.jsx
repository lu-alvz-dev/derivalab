function AnalyticsCard({ title, value }) {
  return (
    <div
      className="
        h-full
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
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
