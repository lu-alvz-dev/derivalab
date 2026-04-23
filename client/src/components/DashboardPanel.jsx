function DashboardPanel({ stats }) {
  return (
    <div className="mt-6 bg-gray-50 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Session Stats</h2>
      <p>Total Attempts: {stats.attempts}</p>
      <p>Correct Answers: {stats.correct}</p>
      <p>Accuracy: {stats.accuracy}%</p>
    </div>
  );
}

export default DashboardPanel;
