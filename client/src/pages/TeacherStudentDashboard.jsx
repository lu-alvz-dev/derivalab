import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import AnalyticsCard from "../components/AnalyticsCard";

import AccuracyChart from "../components/AccuracyChart";

import MostCommonErrorsChart from "../components/MostCommonErrorsChart";

import DifficultyChart from "../components/DifficultyChart";

import HistoryTable from "../components/HistoryTable";

import { fetchTeacherStudentDashboardApi } from "../services/api";

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
    return <p>Loading...</p>;
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
      text-sm
      text-blue-600
      hover:text-blue-700
      font-medium
      transition-colors
    "
          >
            ← Back to Teacher Dashboard
          </Link>

          <div className="mt-4">
            <h1 className="text-4xl font-bold text-slate-800">
              {dashboard.student.email}
            </h1>

            <p className="mt-2 text-slate-500">Student Analytics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnalyticsCard title="Attempts" value={dashboard.stats.attempts} />

          <AnalyticsCard title="Correct" value={dashboard.stats.correct} />

          <AnalyticsCard
            title="Accuracy"
            value={`${dashboard.stats.accuracy}%`}
          />
        </div>

        <section className="mt-8">
          <AccuracyChart studentId={id} />
        </section>

        <section className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <MostCommonErrorsChart studentId={id} />

          <DifficultyChart studentId={id} />
        </section>

        <section className="mt-8">
          <HistoryTable studentId={id} />
        </section>
      </main>
    </>
  );
}

export default TeacherStudentDashboard;
