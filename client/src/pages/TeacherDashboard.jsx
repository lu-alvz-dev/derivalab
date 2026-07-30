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

      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Header */}

          <header className="mb-10 border-b border-slate-200 pb-8">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Teacher Dashboard
            </h1>

            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              Monitor student performance, identify learning patterns, and
              quickly detect students who may require additional support.
            </p>
          </header>

          {/* Main Layout */}

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
            {/* Sidebar */}

            <aside className="order-2 space-y-6 xl:order-1 xl:col-span-3">
              <StudentAnalyticsTable students={students} />
            </aside>

            {/* Main Content */}

            <section className="order-1 space-y-8 xl:order-2 xl:col-span-9">
              {/* KPI */}

              <section>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
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
              </section>

              {/* Progress */}

              <section>
                <AccuracyChart title="Group Learning Progress" />
              </section>

              {/* Charts */}

              <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <MostCommonErrorsChart />

                <DifficultyChart />
              </section>

              {/* Insights */}

              <section>
                <TeacherInsightsPanel students={students} />
              </section>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default TeacherDashboard;
