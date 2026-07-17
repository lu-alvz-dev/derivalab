import { Link, useLocation } from "react-router-dom";
import EmptyState from "./EmptyState";

function StudentAnalyticsTable({ students }) {
  const location = useLocation();

  if (!students.length) {
    return (
      <EmptyState
        title="No Students Yet"
        message="Students associated with your account will appear here after they register."
      />
    );
  }

  return (
    <aside
      className="
bg-white
rounded-2xl
border
border-slate-200
shadow-sm
hover:shadow-md
transition-shadow
duration-200
p-6"
    >
      <h2 className="text-xl font-semibold text-slate-900">My Students</h2>

      <p className="mt-2 text-sm text-slate-500">
        Select a student to view individual analytics.
      </p>

      <div className="mt-6 space-y-2">
        {students.map((student) => {
          const isActive =
            location.pathname === `/teacher/student/${student.id}`;

          return (
            <Link
              key={student.id}
              to={`/teacher/student/${student.id}`}
              className={`
  flex
  items-center
  justify-between
  rounded-xl
  px-4
  py-3
  border
  transition-all
  duration-200
  ${
    isActive
      ? "border-blue-200 bg-blue-50 shadow-sm"
      : "border-transparent hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm hover:-translate-y-0.5"
  }
`}
            >
              <div className="min-w-0">
                <p className="font-medium text-slate-800 truncate">
                  {student.email}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  {student.attempts} attempts
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-blue-600">
                  {student.accuracy}%
                </p>

                <p className="text-xs text-slate-400">accuracy</p>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default StudentAnalyticsTable;
