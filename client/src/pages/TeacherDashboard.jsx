import { useEffect, useState } from "react";
import {
  fetchTeacherDashboardApi,
  fetchTeacherStudentsApi,
} from "../services/api";
import Navbar from "../components/Navbar";
import HistoryTable from "../components/HistoryTable";
import AnalyticsCard from "../components/AnalyticsCard";
import MostCommonErrorsChart from "../components/MostCommonErrorsChart";
import DifficultyChart from "../components/DifficultyChart";
import AccuracyChart from "../components/AccuracyChart";
import StudentAnalyticsTable from "../components/StudentAnalyticsTable";
import LoadingState from "../components/LoadingState";

function TeacherDashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchTeacherDashboardApi().then((res) => {
      setDashboard(res.data);
    });

    fetchTeacherStudentsApi().then((res) => {
      setStudents(res.data);
    });
  }, []);

  if (!dashboard) {
    return <LoadingState message="Loading teacher dashboard..." />;
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Teacher Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor student performance and learning analytics.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <AnalyticsCard title="Students" value={dashboard.students} />

          <AnalyticsCard title="Total Attempts" value={dashboard.attempts} />

          <AnalyticsCard title="Correct Answers" value={dashboard.correct} />

          <AnalyticsCard
            title="Average Accuracy"
            value={`${dashboard.averageAccuracy}%`}
          />
        </div>
        <section className="mt-8">
          <AccuracyChart />
        </section>
        <section className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <MostCommonErrorsChart />

          <DifficultyChart />
        </section>
        <section className="mt-8">
          <StudentAnalyticsTable students={students} />
        </section>
        <section className="mt-8">
          <HistoryTable />
        </section>
      </main>
    </>
  );
}

export default TeacherDashboard;
