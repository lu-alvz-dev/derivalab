function ExerciseCard({
  exercise,
  userAnswer,
  setUserAnswer,
  onCheck,
  onNext,
}) {
  return (
    <div className="bg-white shadow rounded p-6">
      <p className="mb-4 font-medium">{exercise.question}</p>

      <input
        className="border rounded p-2 w-full"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Enter derivative"
      />

      <div className="mt-4 flex gap-3">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={onCheck}
        >
          Check Answer
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded" onClick={onNext}>
          New Exercise
        </button>
      </div>
    </div>
  );
}

export default ExerciseCard;
