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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/teacher/dashboard"
            className="
    inline-flex
    items-center
    gap-2
    rounded-lg
    border
    border-slate-300
    bg-white
    px-4
    py-2
    text-sm
    font-medium
    text-slate-700
    shadow-sm
    transition-all
    hover:bg-slate-50
    hover:border-blue-500
    hover:text-blue-600
  "
          >
            <span className="text-lg">←</span>

            <span>Back to Teacher Dashboard</span>
          </Link>

          <div className="mt-4">
            <h1 className="text-4xl font-bold text-slate-800">
              {dashboard.student.email}
            </h1>

            <p className="mt-2 text-slate-500">Student Analytics</p>
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
