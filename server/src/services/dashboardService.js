const pool = require("../config/db");

async function getTeacherDashboard() {
  const studentsQuery = `
    SELECT COUNT(*) AS total_students
    FROM users
    WHERE role = 'student'
  `;

  const attemptsQuery = `
    SELECT COUNT(*) AS total_attempts
    FROM exercise_history
  `;

  const accuracyQuery = `
    SELECT
      ROUND(
        AVG(
          CASE
            WHEN is_correct = true
            THEN 100
            ELSE 0
          END
        ),2
      ) AS average_accuracy
    FROM exercise_history
  `;

  const [students, attempts, accuracy] = await Promise.all([
    pool.query(studentsQuery),
    pool.query(attemptsQuery),
    pool.query(accuracyQuery),
  ]);

  return {
    totalStudents: Number(students.rows[0].total_students),
    totalAttempts: Number(attempts.rows[0].total_attempts),
    averageAccuracy: Number(accuracy.rows[0].average_accuracy || 0),
  };
}

module.exports = {
  getTeacherDashboard,
};
