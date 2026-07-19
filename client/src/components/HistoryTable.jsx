import { useEffect, useState } from "react";

import {
  fetchHistoryApi,
  fetchTeacherStudentHistoryApi,
} from "../services/api";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";

function HistoryTable({ studentId = null }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = studentId
      ? fetchTeacherStudentHistoryApi(studentId)
      : fetchHistoryApi();

    request
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.error("Error loading history:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [studentId]);

  if (loading) {
    return <LoadingState message="Loading practice history..." />;
  }
  if (history.length === 0) {
    return (
      <EmptyState
        title="No Practice History"
        message="Completed exercises will appear here once practice begins."
      />
    );
  }

  return (
    <div
      className="w-full
    rounded-2xl
    border
    border-slate-200
    bg-white
    p-6
    shadow-sm
    transition-all
    duration-200
    hover:shadow-md"
    >
      <h2 className="text-xl font-semibold text-slate-800 mb-2">
        {studentId ? "Student History" : "Practice History"}
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Review previous submissions and identify recurring mistakes.
      </p>
      <p className="mb-4 text-sm text-slate-500 md:hidden">
        Swipe horizontally to view all columns.
      </p>
      <div className="overflow-x-auto">
        <table
          className="min-w-[680px]
    lg:min-w-full
    w-full"
        >
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-sm font-semibold text-slate-500">
              <th className="px-4 py-3 text-left whitespace-nowrap">
                Question
              </th>

              <th className="px-4 py-3 text-left whitespace-nowrap">Answer</th>

              <th className="px-4 py-3 text-left whitespace-nowrap">Correct</th>

              <th className="px-4 py-3 text-left whitespace-nowrap">Error</th>

              <th className="px-4 py-3 text-left whitespace-nowrap">
                Difficulty
              </th>

              <th className="px-4 py-3 text-left whitespace-nowrap">Date</th>
            </tr>
          </thead>

          <tbody>
            {history.map((attempt) => (
              <tr
                key={attempt.id}
                className="border-b
    border-slate-100
    last:border-none
    hover:bg-slate-50
    transition-colors"
              >
                <td className="px-4 py-3 min-w-[280px]">{attempt.question}</td>

                <td className="px-4 py-3 min-w-[180px]">
                  {attempt.user_answer}
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  {attempt.is_correct ? "✅" : "❌"}
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  {attempt.error_type || "-"}
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  {attempt.difficulty}
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  {new Date(attempt.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryTable;
