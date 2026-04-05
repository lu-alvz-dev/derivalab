import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [exercise, setExercise] = useState(null);

  const fetchExercise = () => {
    axios
      .get("http://localhost:3000/api/exercises")
      .then((res) => setExercise(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchExercise();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>DerivaLab</h1>

      {exercise ? (
        <>
          <p>
            <strong>Exercise:</strong> {exercise.question}
          </p>
          <p>
            <strong>Answer:</strong> {exercise.answer}
          </p>
          <button onClick={fetchExercise}>Generate New</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
