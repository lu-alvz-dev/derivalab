import { useEffect, useState, useCallback } from "react";
import { fetchStatsApi, fetchHistoryApi } from "../services/api";
import { getCurrentUser } from "../utils/auth";

function StudentDashboard() {
  const currentUser = getCurrentUser();

  const [stats, setStats] = useState({
    attempts: 0,
    correct: 0,
    accuracy: 0,
  });

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    try {
      const [statsResponse, historyResponse] = await Promise.all([
        fetchStatsApi(currentUser.userId),
        fetchHistoryApi(currentUser.userId),
      ]);

      setStats(statsResponse.data);
      setHistory(historyResponse.data);

      setLoading(false);
    } catch (error) {
      console.error("Student dashboard error:", error);
      setLoading(false);
    }
  }, [currentUser.userId]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (!currentUser) {
    return <div className="p-6">Session expired. Please log in again.</div>;
  }

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Student Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Total Attempts</h2>

          <p className="text-4xl font-bold mt-2">{stats.attempts}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Correct Answers</h2>

          <p className="text-4xl font-bold mt-2">{stats.correct}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Accuracy</h2>

          <p className="text-4xl font-bold mt-2">{stats.accuracy}%</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

        {history.length === 0 ? (
          <p className="text-gray-500">No attempts yet.</p>
        ) : (
          <ul className="space-y-3">
            {history.slice(0, 5).map((attempt) => (
              <li key={attempt.id} className="border-b pb-2">
                <p className="font-medium">{attempt.question}</p>

                <p
                  className={
                    attempt.is_correct ? "text-green-600" : "text-red-600"
                  }
                >
                  {attempt.is_correct ? "Correct" : "Incorrect"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default StudentDashboard;
