import { useEffect, useState } from "react";

import {
  fetchAccuracyChartApi,
  fetchTeacherStudentAccuracyApi,
} from "../services/api";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EmptyState from "./EmptyState";

function AccuracyChart({ studentId = null }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const request = studentId
      ? fetchTeacherStudentAccuracyApi(studentId)
      : fetchAccuracyChartApi();

    request
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error loading accuracy chart:", error);
      });
  }, [studentId]);

  if (data.length === 0) {
    return (
      <EmptyState
        title="No Accuracy Data"
        message="Practice attempts will appear here once exercises have been completed."
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Accuracy Over Time</h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="attempt" tick={{ fontSize: 12 }} />

          <YAxis domain={[0, 100]} />

          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
            }}
          />

          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AccuracyChart;
