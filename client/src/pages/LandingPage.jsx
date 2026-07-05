import { useNavigate } from "react-router-dom";
import { loginUserApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showDemoMenu, setShowDemoMenu] = useState(false);

  const loginDemo = async (email, password) => {
    try {
      const response = await loginUserApi({
        email,
        password,
      });

      login(response.data.user, response.data.token);

      if (response.data.user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      console.error("Demo login failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-blue-600">
          Intelligent Calculus Practice for Teachers
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          Generate derivative exercises instantly, detect student mistakes, and
          deliver personalized feedback automatically.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

          <div className="relative">
            <button
              onClick={() => setShowDemoMenu(!showDemoMenu)}
              className="bg-white border px-6 py-3 rounded-lg shadow hover:bg-gray-100"
            >
              Try Demo
            </button>

            {showDemoMenu && (
              <div
                className="
      absolute
      mt-2
      w-60
      rounded-lg
      bg-white
      shadow-lg
      border
      overflow-hidden
      z-50
    "
              >
                <button
                  onClick={() =>
                    loginDemo("demo.teacher@derivalab.com", "Demo123!")
                  }
                  className="
          block
          w-full
          text-left
          px-4
          py-3
          hover:bg-gray-100
        "
                >
                  👩‍🏫 Teacher Experience
                </button>

                <button
                  onClick={() =>
                    loginDemo("demo.student@derivalab.com", "Demo123!")
                  }
                  className="
          block
          w-full
          text-left
          px-4
          py-3
          hover:bg-gray-100
        "
                >
                  🎓 Student Experience
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-gray-600">
          Already have an account?{" "}
          <button
            className="text-blue-600 font-semibold hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold">Generate Exercises</h3>
          <p className="mt-3 text-gray-600">
            Create derivative exercises by type and difficulty in seconds.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold">Detect Mistakes</h3>
          <p className="mt-3 text-gray-600">
            Identify common student errors automatically.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold">Track Progress</h3>
          <p className="mt-3 text-gray-600">
            Monitor accuracy and student performance over time.
          </p>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
