import { useEffect, useState } from "react";

import { fetchAccuracyChartApi } from "../services/api";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AccuracyChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAccuracyChartApi()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error loading accuracy chart:", error);
      });
  }, []);

  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Accuracy Over Time</h2>

        <p className="text-gray-500">No accuracy data available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Accuracy Over Time</h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="attempt"
            label={{
              value: "Attempt",
              position: "insideBottom",
              offset: -5,
            }}
          />

          <YAxis domain={[0, 100]} />

          <Tooltip formatter={(value) => [`${value}%`, "Accuracy"]} />

          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AccuracyChart;
