function ExerciseHistoryPanel({ history }) {
  if (!history.length) {
    return (
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-lg mb-2">
          Exercise History
        </h2>

        <p className="text-gray-500">
          No exercises completed yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-4">
        Exercise History
      </h2>

      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="border rounded p-3"
          >
            <div className="flex justify-between">
              <p className="font-medium">
                {item.question}
              </p>

              <span>
                {item.is_correct ? "✅" : "❌"}
              </span>
            </div>

            <p className="text-sm text-gray-600">
              Your answer: {item.user_answer}
            </p>

            <p className="text-sm text-gray-600">
              Correct answer: {item.correct_answer}
            </p>

            {item.error_type && (
              <p className="text-red-500 text-sm">
                {item.error_type}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExerciseHistoryPanel;