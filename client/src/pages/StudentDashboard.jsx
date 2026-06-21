import { useEffect, useState } from "react";
import { fetchStudentDashboardApi } from "../services/api";
import Navbar from "../components/Navbar";

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
    <>
      <Navbar />
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
    </>
  );
}

export default StudentDashboardPage;
