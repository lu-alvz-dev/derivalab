import { useEffect, useState } from "react";

import { fetchDifficultyChartApi } from "../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function DifficultyChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDifficultyChartApi()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error loading difficulty chart:", error);
      });
  }, []);

  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Exercises by Difficulty</h2>

        <p className="text-gray-500">No exercises available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Exercises by Difficulty</h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="difficulty" tick={{ fontSize: 12 }} />

          <YAxis />

          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
            }}
          />

          <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DifficultyChart;
