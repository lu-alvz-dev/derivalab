import { useEffect, useState } from "react";
import { fetchTeacherDashboardApi } from "../services/api";

function TeacherDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchTeacherDashboardApi().then((res) => {
      setDashboard(res.data);
    });
  }, []);

  if (!dashboard) {
    return <p>Loading...</p>;
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Teacher Dashboard</h1>

      <div className="mt-6">
        <p>
          Attempts:
          {dashboard.attempts}
        </p>

        <p>
          Correct:
          {dashboard.correct}
        </p>

        <p>
          Accuracy:
          {dashboard.accuracy}%
        </p>
      </div>
    </main>
  );
}

export default TeacherDashboard;
