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
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">
        Student Analytics
      </h2>
      <p className="text-gray-500 mb-6">
        Review the individual progress of every student assigned to your
        classroom.
      </p>
      <p className="mb-4 text-sm text-slate-500 md:hidden">
        Swipe horizontally to view all student metrics.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full">
          <thead>
            <tr className="border-b text-left text-sm font-semibold text-slate-500">
              <th className="pb-3 text-left text-sm font-semibold text-slate-500 whitespace-nowrap">
                Student
              </th>

              <th className="pb-3 text-left text-sm font-semibold text-slate-500 whitespace-nowrap">
                Attempts
              </th>

              <th className="pb-3 text-left text-sm font-semibold text-slate-500 whitespace-nowrap">
                Correct
              </th>

              <th className="pb-3 text-left text-sm font-semibold text-slate-500 whitespace-nowrap">
                Accuracy
              </th>

              <th className="pb-3 text-left text-sm font-semibold text-slate-500 whitespace-nowrap">
                Dashboard
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 min-w-[220px]">{student.email}</td>

                <td className="py-4 whitespace-nowrap">{student.attempts}</td>

                <td className="py-4 whitespace-nowrap">{student.correct}</td>

                <td className="py-4 whitespace-nowrap">{student.accuracy}%</td>

                <td className="whitespace-nowrap">
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
    </div>
  );
}

export default StudentAnalyticsTable;
