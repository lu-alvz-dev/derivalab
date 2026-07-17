function FeedbackPanel({ result, feedback, errorType, onNextExercise }) {
  if (result === null) return null;

  return (
    <div
      className="
        mt-6
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p
            className={`text-xl font-bold ${
              result ? "text-green-600" : "text-red-600"
            }`}
          >
            {result ? "✓ Correct answer!" : "✗ Incorrect answer"}
          </p>

          {feedback && (
            <p className="mt-3 text-slate-600 leading-7">{feedback}</p>
          )}

          {errorType && (
            <p className="mt-2 text-sm text-slate-500">{errorType}</p>
          )}
        </div>

        <button
          onClick={onNextExercise}
          className="
            shrink-0
            rounded-xl
            bg-blue-600
            px-5
            py-3
            font-medium
            text-white
            transition-all
            duration-200
            hover:bg-blue-700
            hover:shadow-md
          "
        >
          Next Exercise →
        </button>
      </div>
    </div>
  );
}

export default FeedbackPanel;
