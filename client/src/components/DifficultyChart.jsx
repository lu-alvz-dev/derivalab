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
import LoadingState from "./LoadingState";
import ChartCard from "./ChartCard";

function DifficultyChart({ studentId = null }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [studentId]);

  if (loading) {
    return <LoadingState message="Loading difficulty statistics..." />;
  }

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
    <ChartCard
      title={
        studentId
          ? "Student Difficulty Performance"
          : "Group Difficulty Distribution"
      }
      description="Practice attempts grouped by selected difficulty."
    >
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
    </ChartCard>
  );
}

export default DifficultyChart;
