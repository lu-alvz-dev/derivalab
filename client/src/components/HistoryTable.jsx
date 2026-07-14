import { useEffect, useState } from "react";

import {
  fetchHistoryApi,
  fetchTeacherStudentHistoryApi,
} from "../services/api";
import EmptyState from "./EmptyState";

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
        console.error("Error loading history:", error);
      });
  }, [studentId]);

  if (history.length === 0) {
    return (
      <EmptyState
        title="No Practice History"
        message="Completed exercises will appear here once practice begins."
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
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
        <table className="min-w-[900px] w-full">
          <thead className="border-b">
            <tr className="text-sm font-semibold text-slate-500">
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-500 border-b whitespace-nowrap">
                Question
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-500 border-b whitespace-nowrap">
                Answer
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-500 border-b whitespace-nowrap">
                Correct
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-500 border-b whitespace-nowrapp">
                Error
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-500 border-b whitespace-nowrap">
                Difficulty
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-500 border-b whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {history.map((attempt) => (
              <tr key={attempt.id} className="border-b last:border-none">
                <td className="px-4 py-3 border-b min-w-[280px]">
                  {attempt.question}
                </td>

                <td className="px-4 py-3 border-b min-w-[180px]">
                  {attempt.user_answer}
                </td>

                <td className="px-4 py-3 border-b whitespace-nowrap">
                  {attempt.is_correct ? "✅" : "❌"}
                </td>

                <td className="px-4 py-3 border-b whitespace-nowrap">
                  {attempt.error_type || "-"}
                </td>

                <td className="px-4 py-3 border-b whitespace-nowrap">
                  {attempt.difficulty}
                </td>

                <td className="px-4 py-3 border-b whitespace-nowrap">
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
