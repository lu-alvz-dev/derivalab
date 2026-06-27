import { useEffect, useState } from "react";
import { fetchStudentDashboardApi, fetchHistoryApi } from "../services/api";
import Navbar from "../components/Navbar";
import AnalyticsCard from "../components/AnalyticsCard";
import { Link } from "react-router-dom";
import HistoryTable from "../components/HistoryTable";

function StudentDashboardPage() {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchStudentDashboardApi().then((res) => {
      setStats(res.data);
    });
    fetchHistoryApi().then((res) => {
      setHistory(res.data);
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

        <div className="mt-8">
          <Link
            to="/practice"
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Practice
          </Link>
        </div>
        <section className="mt-8">
          <HistoryTable history={history} />
        </section>
      </main>
    </>
  );
}

export default StudentDashboardPage;
