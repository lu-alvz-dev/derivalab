import { useEffect, useState } from "react";
import { fetchStudentDashboardApi } from "../services/api";
import Navbar from "../components/Navbar";
import AnalyticsCard from "../components/AnalyticsCard";
import { Link, useLocation } from "react-router-dom";
import HistoryTable from "../components/HistoryTable";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";

function StudentDashboardPage() {
  const [stats, setStats] = useState(null);
  const location = useLocation();

  const loadDashboard = () => {
    fetchStudentDashboardApi()
      .then((res) => {
        setStats(res.data);
      })
      .catch((error) => {
        console.error("Dashboard error:", error);
      });
  };

  useEffect(() => {
    loadDashboard();
  }, [location.key]);

  if (!stats) {
    return <LoadingState message="Loading your dashboard..." />;
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 min-h-screen">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Student Dashboard
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Review your progress, analyze your learning history, and improve and
            continue practicing derivatives.
          </p>
        </div>

        {stats.attempts === 0 ? (
          <section className="mt-10">
            <EmptyState
              title="Welcome!"
              message="You haven't completed any exercises yet. Start practicing to build your learning statistics."
            />
          </section>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnalyticsCard title="Total Attempts" value={stats.attempts} />

            <AnalyticsCard title="Correct Answers" value={stats.correct} />

            <AnalyticsCard title="Accuracy" value={`${stats.accuracy}%`} />
          </div>
        )}

        <div className="mt-10 flex justify-center sm:justify-start">
          <Link
            to="/practice"
            className="
inline-flex
items-center
justify-center
rounded-lg
bg-blue-600
px-5
py-2.5
text-sm
font-medium
text-white
transition-all
duration-200
hover:bg-blue-700
hover:shadow-md
"
          >
            Continue Practicing
          </Link>
        </div>
        {stats.attempts > 0 && (
          <section className="mt-10">
            <HistoryTable />
          </section>
        )}
      </main>
    </>
  );
}

export default StudentDashboardPage;
