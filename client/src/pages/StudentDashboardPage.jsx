import { useEffect, useState } from "react";
import { fetchStudentDashboardApi } from "../services/api";
import Navbar from "../components/Navbar";
import AnalyticsCard from "../components/AnalyticsCard";
import { Link } from "react-router-dom";
import HistoryTable from "../components/HistoryTable";

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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Student Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Review your progress and continue practicing derivatives.
          </p>
        </div>

        <div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6
  "
        >
          <AnalyticsCard title="Total Attempts" value={stats.attempts} />

          <AnalyticsCard title="Correct Answers" value={stats.correct} />

          <AnalyticsCard title="Accuracy" value={`${stats.accuracy}%`} />
        </div>

        <div className="mt-8 flex justify-center sm:justify-start">
          <Link
            to="/practice"
            className="
      inline-flex
      items-center
      gap-2
      rounded-xl
      bg-blue-600
      px-8
      py-4
      text-lg
      font-semibold
      text-white
      shadow-md
      transition-all
      duration-200
      hover:bg-blue-700
      hover:shadow-lg
      hover:-translate-y-0.5
      active:translate-y-0
    "
          >
            Continue Practicing
          </Link>
        </div>
        <section className="mt-8">
          <HistoryTable />
        </section>
      </main>
    </>
  );
}

export default StudentDashboardPage;
