function FeedbackPanel({ result, feedback, errorType }) {
  if (result === null) return null;

  return (
    <div className="mt-4">
      <p className={`font-bold ${result ? "text-green-600" : "text-red-600"}`}>
        {result ? "Correct answer!" : "Try again"}
      </p>

      {errorType && <p className="text-sm text-gray-500">{errorType}</p>}
      {feedback && <p className="mt-2 text-orange-600">{feedback}</p>}
    </div>
  );
}

export default FeedbackPanel;
