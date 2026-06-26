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
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>

        <div className=" mt-6 grid md:grid-cols-3 gap-6">
          <AnalyticsCard title="Total Attempts" value={dashboard.attempts} />

          <AnalyticsCard title="Correct Answers" value={dashboard.correct} />

          <AnalyticsCard title="Accuracy" value={`${dashboard.accuracy}%`} />
        </div>
        <div className="mt-6">
          <HistoryTable history={history} />
        </div>
        <div className="mt-8">
          <MostCommonErrorsChart />
          <DifficultyChart />
        </div>
      </main>
    </>
  );
}

export default TeacherDashboard;
