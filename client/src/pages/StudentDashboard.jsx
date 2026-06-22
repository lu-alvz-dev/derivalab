import { useEffect, useState } from "react";
import { fetchStudentDashboardApi } from "../services/api";
import Navbar from "../components/Navbar";
import AnalyticsCard from "../components/AnalyticsCard";

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

        <div
          className="mt-6 grid md:grid-cols-3 gap-6
  "
        >
          <AnalyticsCard title="Total Attempts" value={stats.attempts} />

          <AnalyticsCard title="Correct Answers" value={stats.correct} />

          <AnalyticsCard title="Accuracy" value={`${stats.accuracy}%`} />
        </div>
      </main>
    </>
  );
}

export default StudentDashboardPage;
