import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";

function StudentAnalyticsTable({ students }) {
  if (!students.length) {
    return (
      <EmptyState
        title="No Students Yet"
        message="Students associated with your account will appear here after they register."
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">
        Student Analytics
      </h2>
      <p className="text-gray-500 mb-6">
        Review the individual progress of every student assigned to your
        classroom.
      </p>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="border-b text-left text-sm font-semibold text-slate-500">
            <th className="pb-3">Student</th>

            <th className="pb-3">Attempts</th>

            <th className="pb-3">Correct</th>

            <th className="pb-3">Accuracy</th>

            <th className="pb-3">Dashboard</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-4">{student.email}</td>

              <td>{student.attempts}</td>

              <td>{student.correct}</td>

              <td>{student.accuracy}%</td>

              <td>
                <Link
                  to={`/teacher/student/${student.id}`}
                  className="
                    inline-flex
                    rounded-lg
                    bg-blue-600
                    px-4
                    py-2
                    text-white
                    hover:bg-blue-700
                    transition-colors
                  "
                >
                  View Dashboard
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentAnalyticsTable;
