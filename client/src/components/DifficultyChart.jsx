import { useEffect, useState } from "react";

import {
  fetchDifficultyChartApi,
  fetchTeacherStudentDifficultyApi,
} from "../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import EmptyState from "./EmptyState";

function DifficultyChart({ studentId = null }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const request = studentId
      ? fetchTeacherStudentDifficultyApi(studentId)
      : fetchDifficultyChartApi();

    request
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error loading difficulty chart:", error);
      });
  }, [studentId]);

  if (data.length === 0) {
    return (
      <EmptyState
        title="No Difficulty Data"
        message="Difficulty statistics will appear after students complete exercises."
      />
    );
  }
  const formattedData = data.map((item) => ({
    ...item,
    difficulty:
      item.difficulty.charAt(0).toUpperCase() +
      item.difficulty.slice(1).toLowerCase(),
  }));
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {studentId
          ? "Student Difficulty Performance"
          : "Group Difficulty Distribution"}
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="difficulty" tick={{ fontSize: 12 }} tickMargin={12} />

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
