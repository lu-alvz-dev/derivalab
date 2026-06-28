const pool = require("../config/db");

async function getTeacherDashboard(userId) {
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

async function getAccuracyOverTime(userId) {
  const query = `
    SELECT
      created_at,
      is_correct

    FROM exercise_history

    WHERE user_id = $1

    ORDER BY created_at DESC

    LIMIT 40
  `;

  const result = await pool.query(query, [userId]);

  /*
    PostgreSQL devuelve primero el intento más reciente.

    Recharts necesita que los datos estén del más antiguo
    al más reciente para dibujar correctamente la línea.
  */

  const attempts = result.rows.reverse();

  let correct = 0;

  return attempts.map((attempt, index) => {
    if (attempt.is_correct) {
      correct++;
    }

    return {
      attempt: index + 1,
      accuracy: Math.round((correct / (index + 1)) * 100),
    };
  });
}

async function getMostCommonErrors(userId) {
  const query = `
    SELECT
      error_type,
      COUNT(*) AS count

    FROM exercise_history

    WHERE user_id = $1
      AND error_type IS NOT NULL

    GROUP BY error_type

    ORDER BY count DESC
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
}

async function getExercisesByDifficulty(userId) {
  const query = `
    SELECT
      difficulty,
      COUNT(*) AS count

    FROM exercise_history

    WHERE user_id = $1

    GROUP BY difficulty
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
}

module.exports = {
  getTeacherDashboard,
  getAccuracyOverTime,
  getMostCommonErrors,
  getExercisesByDifficulty,
};
