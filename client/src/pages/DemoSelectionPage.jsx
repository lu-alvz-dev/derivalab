import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { loginUserApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { DEMO_ACCOUNTS } from "../constants/demoAccounts";

function DemoSelectionPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loadingTeacher, setLoadingTeacher] = useState(false);
  const [loadingStudent, setLoadingStudent] = useState(false);

  const loginTeacherDemo = async () => {
    try {
      setLoadingTeacher(true);

      const response = await loginUserApi(DEMO_ACCOUNTS.teacher);

      login(response.data.user, response.data.token);

      navigate("/teacher/dashboard");
    } catch (error) {
      console.error("Teacher demo login failed:", error);
    } finally {
      setLoadingTeacher(false);
    }
  };

  const loginStudentDemo = async () => {
    try {
      setLoadingStudent(true);

      const response = await loginUserApi(DEMO_ACCOUNTS.student);

      login(response.data.user, response.data.token);

      navigate("/student/dashboard");
    } catch (error) {
      console.error("Student demo login failed:", error);
    } finally {
      setLoadingStudent(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}

          <div className="max-w-3xl mx-auto text-center">
            <span
              className="
                inline-flex
                rounded-full
                bg-blue-100
                px-4
                py-1
                text-sm
                font-medium
                text-blue-700
              "
            >
              Interactive Product Demo
            </span>

            <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
              Explore DerivaLab
            </h1>

            <p className="mt-6 text-xl leading-8 text-slate-600">
              Experience the platform exactly as teachers and students use it.
              No registration required.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Teacher */}

            <section
              className="
                flex
                flex-col
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >
              <div className="text-6xl text-center">👨‍🏫</div>

              <div className="mt-6 text-center">
                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-slate-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-600
                  "
                >
                  Demo Account
                </span>

                <h2 className="mt-4 text-2xl font-bold text-slate-900">
                  Teacher Experience
                </h2>

                <p className="mt-4 text-slate-600 leading-7">
                  Explore classroom analytics and understand how DerivaLab helps
                  teachers monitor learning progress.
                </p>
              </div>

              <ul className="mt-8 space-y-3 text-slate-600 flex-1">
                <li>✓ Teacher Dashboard</li>
                <li>✓ Student Analytics</li>
                <li>✓ Learning Progress</li>
                <li>✓ Error Analysis</li>
                <li>✓ Difficulty Distribution</li>
                <li>✓ Practice History</li>
              </ul>

              <button
                onClick={loginTeacherDemo}
                disabled={loadingTeacher}
                className="
                  mt-10
                  w-full
                  rounded-xl
                  bg-blue-600
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:bg-blue-700
                  hover:shadow-lg
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                {loadingTeacher
                  ? "Launching Teacher Demo..."
                  : "Launch Teacher Demo"}
              </button>
            </section>

            {/* Student */}

            <section
              className="
                flex
                flex-col
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >
              <div className="text-6xl text-center">👨‍🎓</div>

              <div className="mt-6 text-center">
                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-slate-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-600
                  "
                >
                  Demo Account
                </span>

                <h2 className="mt-4 text-2xl font-bold text-slate-900">
                  Student Experience
                </h2>

                <p className="mt-4 text-slate-600 leading-7">
                  Practice derivatives, receive instant feedback and track your
                  learning progress.
                </p>
              </div>

              <ul className="mt-8 space-y-3 text-slate-600 flex-1">
                <li>✓ Interactive Exercises</li>
                <li>✓ Instant Feedback</li>
                <li>✓ Practice History</li>
                <li>✓ Learning Statistics</li>
                <li>✓ Continue Practice</li>
                <li>✓ Personal Dashboard</li>
              </ul>

              <button
                onClick={loginStudentDemo}
                disabled={loadingStudent}
                className="
                  mt-10
                  w-full
                  rounded-xl
                  bg-blue-600
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:bg-blue-700
                  hover:shadow-lg
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                {loadingStudent
                  ? "Launching Student Demo..."
                  : "Launch Student Demo"}
              </button>
            </section>
          </div>

          {/* Footer */}

          <div className="mt-16 text-center">
            <p className="text-sm text-slate-500">
              Both demo accounts include preloaded data so you can immediately
              explore the platform without creating an account.
            </p>

            <Link
              to="/"
              className="
                mt-6
                inline-flex
                items-center
                text-blue-600
                font-medium
                hover:text-blue-700
              "
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default DemoSelectionPage;
