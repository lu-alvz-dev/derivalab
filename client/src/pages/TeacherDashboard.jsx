import { useEffect, useState } from "react";
import { fetchTeacherDashboardApi } from "../services/api";
import Navbar from "../components/Navbar";
import HistoryTable from "../components/HistoryTable";
import { fetchHistoryApi } from "../services/api";
import AnalyticsCard from "../components/AnalyticsCard";
import MostCommonErrorsChart from "../components/MostCommonErrorsChart";
import DifficultyChart from "../components/DifficultyChart";

function TeacherDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchTeacherDashboardApi().then((res) => {
      setDashboard(res.data);
    });
    fetchHistoryApi().then((res) => {
      setHistory(res.data);
    });
  }, []);

  if (!dashboard) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Teacher Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor student performance and learning analytics.
          </p>
        </div>

        <div className=" mt-8 grid md:grid-cols-3 gap-6">
          <AnalyticsCard title="Total Attempts" value={dashboard.attempts} />

          <AnalyticsCard title="Correct Answers" value={dashboard.correct} />

          <AnalyticsCard title="Accuracy" value={`${dashboard.accuracy}%`} />
        </div>
        <section className="mt-8">
          <AccuracyChart />
        </section>
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <MostCommonErrorsChart />

          <DifficultyChart />
        </section>
        <section className="mt-8">
          <HistoryTable history={history} />
        </section>
      </main>
    </>
  );
}

export default TeacherDashboard;
