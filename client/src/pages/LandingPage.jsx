function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-blue-600">
          Intelligent Calculus Practice for Teachers
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          Generate derivative exercises instantly, detect student mistakes, and
          deliver personalized feedback automatically.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow">
            Get Started
          </button>

          <button className="bg-white border px-6 py-3 rounded-lg shadow">
            Live Demo
          </button>
        </div>
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
