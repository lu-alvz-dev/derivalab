import { Link } from "react-router-dom";

import EmptyState from "./EmptyState";

function TeacherInsightsPanel({ students }) {
  if (!students.length) {
    return (
      <EmptyState
        title="No Student Insights"
        message="Student insights will appear once students begin practicing."
      />
    );
  }

  const sortedStudents = [...students].sort((a, b) => a.accuracy - b.accuracy);

  const studentsNeedingAttention = sortedStudents.slice(0, 5);

  const getBadge = (accuracy) => {
    if (accuracy >= 80) {
      return {
        icon: "🟢",
        label: "Excellent",
        color: "text-green-600",
        background: "bg-green-50",
      };
    }

    if (accuracy >= 60) {
      return {
        icon: "🟡",
        label: "Needs Practice",
        color: "text-yellow-700",
        background: "bg-yellow-50",
      };
    }

    return {
      icon: "🔴",
      label: "Needs Attention",
      color: "text-red-600",
      background: "bg-red-50",
    };
  };

  const formatLastActivity = (date) => {
    if (!date) {
      return "No activity";
    }

    return new Date(date).toLocaleDateString();
  };

  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:shadow-md
      "
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Students Requiring Attention
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Students are ordered by lowest accuracy to help identify learners who
          may benefit from additional support.
        </p>
      </div>

      <div className="space-y-4">
        {studentsNeedingAttention.map((student) => {
          const badge = getBadge(student.accuracy);

          return (
            <div
              key={student.id}
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-5
                transition-all
                duration-200
                hover:border-blue-200
                hover:shadow-sm
              "
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <p className="truncate text-base font-semibold text-slate-800">
                    {student.email}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
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

                  <div
                    className={`
                      mt-4
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      px-3
                      py-1
                      text-sm
                      font-medium
                      ${badge.background}
                      ${badge.color}
                    `}
                  >
                    <span>{badge.icon}</span>

                    <span>{badge.label}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Accuracy
                    </p>

                    <p className="text-3xl font-bold text-blue-600">
                      {student.accuracy}%
                    </p>
                  </div>

                  <Link
                    to={`/teacher/student/${student.id}`}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-600
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-white
                      transition-colors
                      duration-200
                      hover:bg-blue-700
                    "
                  >
                    View Analytics
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TeacherInsightsPanel;
