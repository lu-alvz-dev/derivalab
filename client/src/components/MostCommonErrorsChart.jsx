import { useEffect, useState } from "react";

import {
  fetchErrorsChartApi,
  fetchTeacherStudentErrorsApi,
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

function MostCommonErrorsChart({ studentId = null }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = studentId
      ? fetchTeacherStudentErrorsApi(studentId)
      : fetchErrorsChartApi();

    request
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error loading error chart:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [studentId]);

  if (loading) {
    return <LoadingState message="Loading error analysis..." />;
  }

  if (data.length === 0) {
    return (
      <EmptyState
        title="No Error Analysis"
        message="There are no recorded mistakes to analyze yet."
      />
    );
  }

  const formattedData = data.map((item) => {
    const label = item.error_type ?? "";

    return {
      ...item,
      error_type: label
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase()),
    };
  });

  return (
    <ChartCard
      title={studentId ? "Student Error Analysis" : "Group Error Analysis"}
      description="Frequent mistakes detected during derivative practice."
    >
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={formattedData}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="error_type"
            angle={-20}
            textAnchor="end"
            interval={0}
            tickMargin={18}
            tick={{
              fontSize: 12,
              textTransform: "capitalize",
            }}
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
    </ChartCard>
  );
}

export default MostCommonErrorsChart;
