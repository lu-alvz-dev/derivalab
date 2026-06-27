function AnalyticsCard({ title, value }) {
  return (
    <div
      className="
      rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow p-6
    "
    >
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="text-4xl font-extrabold mt-2 text-blue-600">{value}</p>
    </div>
  );
}

export default AnalyticsCard;
