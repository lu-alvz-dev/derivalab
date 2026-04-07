import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [exercise, setExercise] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);

  const [type, setType] = useState("polynomial");
  const [difficulty, setDifficulty] = useState("easy");

  const fetchExercise = () => {
    axios
      .get(
        `http://localhost:3000/api/exercises?type=${type}&difficulty=${difficulty}`,
      )
      .then((res) => {
        setExercise(res.data);
        setUserAnswer("");
        setResult(null);
      })
      .catch((err) => console.error(err));
  };

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
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>DerivaLab</h1>

      {/* SELECTORS */}
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
