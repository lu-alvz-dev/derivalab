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
        <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>

        <p className="text-gray-500">No accuracy data available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
      <p className="text-sm text-gray-500 mb-6">
        Based on your last 40 practice attempts.
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="attempt"
            label={{
              value: "Recent Attempts",
              position: "insideBottom",
              offset: -18,
            }}
            tick={{
              fontSize: 12,
            }}
            tickMargin={12}
          />

          <YAxis domain={[0, 100]} />

          <Tooltip
            formatter={(value) => [`${value}%`, "Accuracy"]}
            labelFormatter={(value) => `Attempt ${value}`}
          />

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
