import { useEffect, useState } from "react";

import { fetchErrorsChartApi } from "../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function MostCommonErrorsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchErrorsChartApi()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error loading error chart:", error);
      });
  }, []);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Most Common Errors</h2>

        <p className="text-gray-500">No errors have been recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Most Common Errors</h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="error_type"
            tick={{ fontSize: 12 }}
            angle={-15}
            textAnchor="end"
          />

          <YAxis />

          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
            }}
          />

          <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MostCommonErrorsChart;
