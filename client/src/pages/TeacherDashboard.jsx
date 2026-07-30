import { useEffect, useState } from "react";

import {
  fetchTeacherDashboardApi,
  fetchTeacherStudentsApi,
} from "../services/api";

import Navbar from "../components/Navbar";
import AnalyticsCard from "../components/AnalyticsCard";
import AccuracyChart from "../components/AccuracyChart";
import MostCommonErrorsChart from "../components/MostCommonErrorsChart";
import DifficultyChart from "../components/DifficultyChart";
import StudentAnalyticsTable from "../components/StudentAnalyticsTable";
import TeacherInsightsPanel from "../components/TeacherInsightsPanel";
import LoadingState from "../components/LoadingState";

function TeacherDashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchTeacherDashboardApi().then((response) => {
      setDashboard(response.data);
    });

    fetchTeacherStudentsApi().then((response) => {
      setStudents(response.data);
    });
  }, []);

  if (!dashboard) {
    return <LoadingState message="Loading teacher dashboard..." />;
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 min-h-screen">
        {/* Header */}

        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Teacher Dashboard
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Monitor student performance, identify learning patterns and quickly
            detect students who may require additional support.
          </p>
        </header>

        {/* Main Layout */}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Sidebar */}

          <aside className="order-2 xl:order-1 xl:col-span-3 space-y-6">
            <StudentAnalyticsTable students={students} />
          </aside>

          {/* Main Content */}

          <section className="order-1 xl:order-2 xl:col-span-9 space-y-8">
            {/* KPI Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <AnalyticsCard title="Students" value={dashboard.students} />

              <AnalyticsCard
                title="Total Attempts"
                value={dashboard.attempts}
              />

              <AnalyticsCard
                title="Correct Answers"
                value={dashboard.correct}
              />

              <AnalyticsCard
                title="Average Accuracy"
                value={`${dashboard.averageAccuracy}%`}
              />
            </div>

            {/* Accuracy Trend */}

            <section>
              <AccuracyChart title="Group Learning Progress" />
            </section>

            {/* Charts */}

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <MostCommonErrorsChart />

              <DifficultyChart />
            </section>

            {/* Teacher Insights */}

            <section>
              <TeacherInsightsPanel students={students} />
            </section>
          </section>
        </div>
      </main>
    </>
  );
}

export default TeacherDashboard;
