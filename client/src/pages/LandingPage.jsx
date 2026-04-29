function LandingPage({ onRegister, onLogin }) {
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
            onClick={onRegister}
          >
            Get Started
          </button>

          <button className="bg-white border px-6 py-3 rounded-lg shadow hover:bg-gray-100">
            Live Demo
          </button>
        </div>

        <p className="mt-6 text-gray-600">
          Already have an account?{" "}
          <button
            className="text-blue-600 font-semibold hover:underline"
            onClick={onLogin}
          >
            Login
          </button>
        </p>
      </section>
    </main>
  );
}

export default LandingPage;
