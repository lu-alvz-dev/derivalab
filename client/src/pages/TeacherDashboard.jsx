import { useEffect, useState } from "react";
import { fetchTeacherDashboardApi } from "../services/api";

function TeacherDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    totalAttempts: 0,
    averageAccuracy: 0,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeacherDashboardApi()
      .then((res) => {
        setDashboardData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);

        setError("Failed to load teacher dashboard");

        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Teacher Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Total Students</h2>

          <p className="text-4xl font-bold mt-2">
            {dashboardData.totalStudents}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Total Attempts</h2>

          <p className="text-4xl font-bold mt-2">
            {dashboardData.totalAttempts}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Average Accuracy</h2>

          <p className="text-4xl font-bold mt-2">
            {dashboardData.averageAccuracy}%
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Platform Analytics</h2>

        <p className="text-gray-600">
          This dashboard aggregates learning activity across all students
          registered in DerivaLab.
        </p>
      </div>
    </main>
  );
}

export default TeacherDashboard;
