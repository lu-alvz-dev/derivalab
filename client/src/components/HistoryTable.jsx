function HistoryTable({ history }) {
  if (!history.length) {
    return <p className="mt-6 text-gray-500">No attempts yet.</p>;
  }

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Question</th>

            <th className="p-2 border">Your Answer</th>

            <th className="p-2 border">Correct</th>

            <th className="p-2 border">Error Type</th>

            <th className="p-2 border">Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((attempt) => (
            <tr key={attempt.id}>
              <td className="border p-2">{attempt.question}</td>

              <td className="border p-2">{attempt.user_answer}</td>

              <td className="border p-2">{attempt.is_correct ? "✅" : "❌"}</td>

              <td className="border p-2">{attempt.error_type || "-"}</td>

              <td className="border p-2">
                {new Date(attempt.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;
