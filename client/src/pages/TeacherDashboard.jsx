import { useEffect, useState } from "react";
import { fetchTeacherDashboardApi } from "../services/api";
import Navbar from "../components/Navbar";
import HistoryTable from "../components/HistoryTable";
import { fetchHistoryApi } from "../services/api";

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
        <div className="mt-6">
          <HistoryTable history={history} />
        </div>
      </main>
    </>
  );
}

export default TeacherDashboard;
