function ControlsPanel({ type, setType, difficulty, setDifficulty }) {
  return (
    <div className="flex gap-4 mb-6">
      <select
        className="border p-2 rounded"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="polynomial">Polynomial</option>
        <option value="power">Power</option>
        <option value="trig">Trigonometric</option>
      </select>

      <select
        className="border p-2 rounded"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

export default ControlsPanel;
