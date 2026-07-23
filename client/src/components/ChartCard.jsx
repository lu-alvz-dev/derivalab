function ChartCard({ title, description, children }) {
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
        transition-shadow
        duration-200
        hover:shadow-md
      "
    >
      <h2 className="text-xl font-semibold text-slate-800 mb-6">{title}</h2>

      <p className="text-sm text-slate-500 mt-1 mb-6">{description}</p>

      {children}
    </div>
  );
}

export default ChartCard;
