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
      };
    }

    if (accuracy >= 60) {
      return {
        icon: "🟡",
        label: "Needs Practice",
        color: "text-yellow-600",
      };
    }

    return {
      icon: "🔴",
      label: "Needs Attention",
      color: "text-red-600",
    };
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
          Students are ordered by lowest accuracy to help identify who may need
          additional support.
        </p>
      </div>

      <div className="space-y-4">
        {studentsNeedingAttention.map((student) => {
          const badge = getBadge(student.accuracy);

          return (
            <div
              key={student.id}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-slate-200
                p-4
                transition-all
                duration-200
                hover:border-blue-200
                hover:bg-slate-50
              "
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-800">
                  {student.email}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {student.attempts} attempts
                </p>

                <p className={`mt-1 text-sm font-medium ${badge.color}`}>
                  {badge.icon} {badge.label}
                </p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <span className="text-2xl font-bold text-blue-600">
                  {student.accuracy}%
                </span>

                <Link
                  to={`/teacher/student/${student.id}`}
                  className="
                    rounded-lg
                    bg-blue-600
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-white
                    transition-colors
                    hover:bg-blue-700
                  "
                >
                  View Analytics
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TeacherInsightsPanel;
