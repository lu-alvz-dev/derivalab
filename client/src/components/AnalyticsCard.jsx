function AnalyticsCard({ title, value }) {
  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow-md
      p-6
      border
      hover:shadow-lg
      transition
    "
    >
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="text-4xl font-extrabold mt-2 text-blue-600">{value}</p>
    </div>
  );
}

export default AnalyticsCard;
