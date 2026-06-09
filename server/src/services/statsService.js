const pool = require("../config/db");

/**  Save exercise attempt and stores a completed exercise interaction 
     in the database.
 * */
async function saveAttempt({
  userId,
  question,
  correctAnswer,
  userAnswer,
  exerciseType,
  difficulty,
  isCorrect,
  errorType,
}) {
  const query = `
    INSERT INTO exercise_history (
      user_id,
      question,
      correct_answer,
      user_answer,
      exercise_type,
      difficulty,
      is_correct,
      error_type
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *
  `;

  const values = [
    userId,
    question,
    correctAnswer,
    userAnswer,
    exerciseType,
    difficulty,
    isCorrect,
    errorType,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
}

// Get student statistics
async function getStudentStats(userId) {
  const query = `
    SELECT
      COUNT(*) AS attempts,
      COUNT(*) FILTER (WHERE is_correct = true) AS correct
    FROM exercise_history
    WHERE user_id = $1
  `;

  const result = await pool.query(query, [userId]);

  const attempts = Number(result.rows[0].attempts);
  const correct = Number(result.rows[0].correct);

  const accuracy = attempts === 0 ? 0 : Math.round((correct / attempts) * 100);

  return {
    attempts,
    correct,
    accuracy,
  };
}

// Get exercise history
async function getExerciseHistory(userId) {
  const query = `
    SELECT *
    FROM exercise_history
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
}

module.exports = {
  saveAttempt,
  getStudentStats,
  getExerciseHistory,
};
