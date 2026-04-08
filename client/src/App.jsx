import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function App() {
  const [exercise, setExercise] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);

  // Filtros para la consulta a la API
  const [type, setType] = useState("polynomial");
  const [difficulty, setDifficulty] = useState("easy");

  /**
   * Fetches a new exercise from the backend. useCallback is used to stabilize the function reference, so useEffect won't enter an infinite loop when state changes, the function is only recreated if 'type' or 'difficulty' change.
   */
  const fetchExercise = useCallback(() => {
    axios
      .get(
        `http://localhost:3000/api/exercises?type=${type}&difficulty=${difficulty}`,
      )
      .then((res) => {
        setExercise(res.data);
        setUserAnswer("");
        setResult(null);
      })
      .catch((err) => {
        console.error("Error fetching exercise:", err);
      });
  }, [type, difficulty]);

  //Sends the user's answer to the server for validation.
  const validateAnswer = () => {
    axios
      .post("http://localhost:3000/api/validate", {
        userAnswer,
        correctAnswer: exercise.answer,
      })
      .then((res) => setResult(res.data.isCorrect));
  };

  useEffect(() => {
    fetchExercise();
  }, [fetchExercise]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: "1rem" }}>DerivaLab</h1>
      <p style={{ color: "#555" }}>
        Practice derivatives with dynamic difficulty and function types
      </p>

      {/* Selectors */}
      <div>
        <label>Type: </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="polynomial">Polynomial</option>
          <option value="power">Power</option>
          <option value="trig">Trigonometric</option>
        </select>

        <label style={{ marginLeft: "1rem" }}>Difficulty: </label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <br />

      {exercise && (
        <>
          <p>
            <strong>Exercise:</strong> {exercise.question}
          </p>

          <input
            type="text"
            placeholder="Enter derivative..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />

          <br />
          <br />

          <button onClick={validateAnswer}>Check Answer</button>
          <button onClick={fetchExercise}>New Exercise</button>

          {result !== null && (
            <p style={{ fontWeight: "bold", color: result ? "green" : "red" }}>
              {result ? "Correct answer!!!" : "Try again"}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
