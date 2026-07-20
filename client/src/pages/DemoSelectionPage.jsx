import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function DemoSelectionPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen bg-slate-50">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Try DerivaLab
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Experience the platform without creating an account.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Teacher Demo */}

          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-8
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <div className="text-5xl mb-6 text-center">👨‍🏫</div>

            <h2 className="text-2xl font-semibold text-slate-900 text-center">
              Teacher Experience
            </h2>

            <p className="mt-4 text-center text-slate-600 leading-7">
              Explore learning analytics, monitor student progress, review
              dashboards, charts and classroom performance.
            </p>

            <button
              className="
                mt-8
                w-full
                rounded-lg
                bg-blue-600
                px-5
                py-3
                font-medium
                text-white
                transition-all
                duration-200
                hover:bg-blue-700
                hover:shadow-lg
              "
            >
              Launch Teacher Demo
            </button>
          </section>

          {/* Student Demo */}

          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-8
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <div className="text-5xl mb-6 text-center">👨‍🎓</div>

            <h2 className="text-2xl font-semibold text-slate-900 text-center">
              Student Experience
            </h2>

            <p className="mt-4 text-center text-slate-600 leading-7">
              Solve derivative exercises, receive instant feedback, track your
              learning progress and review your practice history.
            </p>

            <button
              className="
                mt-8
                w-full
                rounded-lg
                bg-blue-600
                px-5
                py-3
                font-medium
                text-white
                transition-all
                duration-200
                hover:bg-blue-700
                hover:shadow-lg
              "
            >
              Launch Student Demo
            </button>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="
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
      </main>
    </>
  );
}

export default DemoSelectionPage;
