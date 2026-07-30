import { Link, useLocation } from "react-router-dom";

import EmptyState from "./EmptyState";

function StudentAnalyticsTable({ students }) {
  const location = useLocation();

  const formatLastActivity = (date) => {
    if (!date) {
      return "No activity";
    }

    return new Date(date).toLocaleDateString();
  };

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
        p-6
      "
    >
      <h2 className="text-xl font-semibold text-slate-900">My Students</h2>

      <p className="mt-2 text-sm text-slate-500">
        Select a student to view individual analytics.
      </p>

      <div className="mt-6 space-y-3">
        {students.map((student) => {
          const isActive =
            location.pathname === `/teacher/student/${student.id}`;

          return (
            <Link
              key={student.id}
              to={`/teacher/student/${student.id}`}
              className={`
                block
                rounded-xl
                border
                p-4
                transition-all
                duration-200
                ${
                  isActive
                    ? "border-blue-200 bg-blue-50 shadow-sm"
                    : "border-slate-200 hover:border-blue-200 hover:bg-slate-50 hover:shadow-sm"
                }
              `}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">
                    {student.email}
                  </p>

                  <div className="mt-3 space-y-1 text-xs text-slate-500">
                    <p>
                      <span className="font-medium text-slate-700">
                        Attempts:
                      </span>{" "}
                      {student.attempts}
                    </p>

                    <p>
                      <span className="font-medium text-slate-700">
                        Last Activity:
                      </span>{" "}
                      {formatLastActivity(student.lastActivity)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    {student.accuracy}%
                  </p>

                  <p className="mt-1 text-xs text-slate-400">accuracy</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default StudentAnalyticsTable;
