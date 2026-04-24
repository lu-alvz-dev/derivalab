import { useEffect, useState, useCallback } from "react";
import { fetchExerciseApi, validateAnswerApi } from "../services/api";
import Header from "../components/Header";
import ControlsPanel from "../components/ControlsPanel";
import ExerciseCard from "../components/ExerciseCard";
import FeedbackPanel from "../components/FeedbackPanel";
import DashboardPanel from "../components/DashboardPanel";

function App() {
  const [exercise, setExercise] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);

  // Filtros para la consulta a la API
  const [type, setType] = useState("polynomial");
  const [difficulty, setDifficulty] = useState("easy");
  const [feedback, setFeedback] = useState("");
  const [errorType, setErrorType] = useState("");
  const [stats, setStats] = useState({
    attempts: 0,
    correct: 0,
    accuracy: 0,
  });

  // Fetches a new exercise from the backend. useCallback is used to stabilize the function reference, so useEffect won't enter an infinite loop when state changes, the function is only recreated if 'type' or 'difficulty' change.
  const fetchExercise = useCallback(() => {
    fetchExerciseApi(type, difficulty)
      .then((res) => {
        setExercise(res.data);
        setUserAnswer("");
        setResult(null);
        setFeedback("");
        setErrorType("");
      })
      .catch((err) => {
        console.error("Error fetching exercise:", err);
      });
  }, [type, difficulty]);

  //Sends the user's answer to the server for validation.
  const validateAnswer = () => {
    validateAnswerApi({
      userAnswer,
      correctAnswer: exercise.answer,
      exerciseType: exercise.type,
    }).then((res) => {
      const isCorrect = res.data.isCorrect;

      const attempts = stats.attempts + 1;
      const correct = stats.correct + (isCorrect ? 1 : 0);
      const accuracy = Math.round((correct / attempts) * 100);

      setStats({ attempts, correct, accuracy });

      setResult(isCorrect);
      setFeedback(res.data.feedback);
      setErrorType(res.data.errorType);
    });
  };

  useEffect(() => {
    fetchExercise();
  }, [fetchExercise]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Header />
      <ControlsPanel
        type={type}
        setType={setType}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      {exercise && (
        <>
          <ExerciseCard
            exercise={exercise}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            onCheck={validateAnswer}
            onNext={fetchExercise}
          />
          <FeedbackPanel
            result={result}
            feedback={feedback}
            errorType={errorType}
          />
          <DashboardPanel stats={stats} />
        </>
      )}
    </div>
  );
}

export default App;