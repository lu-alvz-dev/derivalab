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

module.exports = {
  getTeacherDashboard,
};
