import { useEffect, useState } from "react";
import { fetchStudentDashboardApi } from "../services/api";

function StudentDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStudentDashboardApi().then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) {
    return <p>Loading...</p>;
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>

      <p>
        Attempts:
        {stats.attempts}
      </p>

      <p>
        Correct:
        {stats.correct}
      </p>

      <p>
        Accuracy:
        {stats.accuracy}%
      </p>
    </main>
  );
}

export default StudentDashboardPage;
