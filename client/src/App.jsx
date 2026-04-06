import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [exercise, setExercise] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);

  const fetchExercise = () => {
    axios.get("http://localhost:3000/api/exercises").then((res) => {
      setExercise(res.data);
      setUserAnswer("");
      setResult(null);
    });
  };

  const validateAnswer = () => {
    axios
      .post("http://localhost:3000/api/validate", {
        userAnswer,
        correctAnswer: exercise.answer.replace("f'(x) = ", ""),
      })
      .then((res) => setResult(res.data.isCorrect));
  };

  useEffect(() => {
    fetchExercise();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>DerivaLab</h1>

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
              {result ? "Correct answer!!" : "Try again"}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
