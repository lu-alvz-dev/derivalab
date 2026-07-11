import { useEffect, useState } from "react";

import {
  fetchHistoryApi,
  fetchTeacherStudentHistoryApi,
} from "../services/api";

function HistoryTable({ studentId = null }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const request = studentId
      ? fetchTeacherStudentHistoryApi(studentId)
      : fetchHistoryApi();

    request
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.error("History error:", error);
      });
  }, [studentId]);

  if (!history.length) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Exercise History</h2>

        <p className="text-gray-500">No attempts yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-6">Exercise History</h2>

      <table className="min-w-full">
        <thead>
          <tr className="border-b text-left text-gray-500">
            <th className="pb-3">Question</th>

            <th className="pb-3">Answer</th>

            <th className="pb-3">Correct</th>

            <th className="pb-3">Error</th>

            <th className="pb-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((attempt) => (
            <tr key={attempt.id} className="border-b last:border-none">
              <td className="py-4">{attempt.question}</td>

              <td>{attempt.user_answer}</td>

              <td>{attempt.is_correct ? "✅" : "❌"}</td>

              <td>{attempt.error_type || "-"}</td>

              <td>{new Date(attempt.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;
