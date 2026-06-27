import { useEffect, useState, useCallback } from "react";
import {
  fetchExerciseApi,
  validateAnswerApi,
  fetchStatsApi,
  fetchHistoryApi,
} from "../services/api";
import Header from "../components/Header";
import ControlsPanel from "../components/ControlsPanel";
import ExerciseCard from "../components/ExerciseCard";
import FeedbackPanel from "../components/FeedbackPanel";
import DashboardPanel from "../components/DashboardPanel";
import ExerciseHistoryPanel from "../components/ExerciseHistoryPanel";
import { getCurrentUser } from "../utils/auth";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function PracticePage() {
  const currentUser = getCurrentUser();

  const [exercise, setExercise] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

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
  const [history, setHistory] = useState([]);

  /* 
   Fetches a new exercise from the backend, useCallback is used to stabilize 
   the function reference, so useEffect won't enter an infinite loop when state changes, 
   the function is only recreated if 'type' or 'difficulty' change.
   */
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
      userId: currentUser.id,
      question: exercise.question,
      userAnswer,
      correctAnswer: exercise.answer,
      exerciseType: exercise.type,
      difficulty: exercise.difficulty,
    }).then((res) => {
      const isCorrect = res.data.isCorrect;

      setResult(isCorrect);
      setFeedback(res.data.feedback);
      setErrorType(res.data.errorType);
      loadStats();
      loadHistory();
    });
  };

  const loadStats = useCallback(() => {
    fetchStatsApi()
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Stats error:", err);
      });
  }, [currentUser?.id]);

  const loadHistory = useCallback(() => {
    fetchHistoryApi()
      .then((res) => {
        setHistory(res.data);
      })
      .catch((err) => {
        console.error("History error:", err);
      });
  }, [currentUser?.id]);

  useEffect(() => {
    fetchExercise();
    loadStats();
    loadHistory();
  }, [fetchExercise, loadStats, loadHistory]);

  if (!currentUser) {
    return (
      <div className="p-6">
        <p>Please login first.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="
      rounded-lg
      border
      px-4
      py-2
      hover:bg-gray-100
      transition
    "
          >
            ← Back
          </button>
        </div>
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
            <ExerciseHistoryPanel history={history} />
          </>
        )}
      </div>
    </>
  );
}

export default PracticePage;
