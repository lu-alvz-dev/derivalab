import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AccuracyChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Accuracy Over Time</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line type="monotone" dataKey="accuracy" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AccuracyChart;
