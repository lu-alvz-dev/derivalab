import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import AnalyticsCard from "../components/AnalyticsCard";

import AccuracyChart from "../components/AccuracyChart";

import MostCommonErrorsChart from "../components/MostCommonErrorsChart";

import DifficultyChart from "../components/DifficultyChart";

import HistoryTable from "../components/HistoryTable";

import { fetchTeacherStudentDashboardApi } from "../services/api";
import LoadingState from "../components/LoadingState";

function TeacherStudentDashboard() {
  const { id } = useParams();

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchTeacherStudentDashboardApi(id)
      .then((response) => {
        setDashboard(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!dashboard) {
    return <LoadingState message="Loading student analytics..." />;
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 min-h-screen">
        <div className="mb-8">
          <Link
            to="/teacher/dashboard"
            className="
inline-flex
items-center
justify-center
rounded-lg
bg-blue-600
px-5
py-2.5
text-sm
font-medium
text-white
transition-all
duration-200
hover:bg-blue-700
hover:shadow-md
"
          >
            <span className="text-lg">←</span>

            <span>Back to Teacher Dashboard</span>
          </Link>

          <div className="mt-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              {dashboard.student.email}
            </h1>

            <p className="mt-1 text-lg font-medium text-blue-600">
              Student Analytics
            </p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              Review this student's performance, identify learning patterns, and
              monitor individual progress through derivative exercises.
            </p>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Performance Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnalyticsCard
              title="Total Attempts"
              value={dashboard.stats.attempts}
            />

            <AnalyticsCard
              title="Correct Answers"
              value={dashboard.stats.correct}
            />

            <AnalyticsCard
              title="Accuracy"
              value={`${dashboard.stats.accuracy}%`}
            />
          </div>
        </section>

        <section className="mt-10">
          <AccuracyChart studentId={id} />
        </section>

        <section className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <MostCommonErrorsChart studentId={id} />

          <DifficultyChart studentId={id} />
        </section>

        <section className="mt-10">
          <HistoryTable studentId={id} />
        </section>
      </main>
    </>
  );
}

export default TeacherStudentDashboard;
