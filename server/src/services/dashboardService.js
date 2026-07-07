const pool = require("../config/db");

async function getTeacherDashboard(teacherId) {
  const query = `
    SELECT
      COUNT(DISTINCT u.id) AS students,

      COUNT(eh.id) AS attempts,

      COUNT(*) FILTER (
        WHERE eh.is_correct = true
      ) AS correct

    FROM users u

    LEFT JOIN exercise_history eh
      ON eh.user_id = u.id

    WHERE
      u.teacher_id = $1
  `;

  const result = await pool.query(query, [teacherId]);

  const row = result.rows[0];

  const students = Number(row.students);

  const attempts = Number(row.attempts);

  const correct = Number(row.correct);

  const averageAccuracy =
    attempts === 0 ? 0 : Math.round((correct / attempts) * 100);

  return {
    students,
    attempts,
    correct,
    averageAccuracy,
  };
}

async function getAccuracyOverTime(teacherId) {
  const query = `
    SELECT
      created_at,
      is_correct

    FROM exercise_history eh

INNER JOIN users u
ON eh.user_id = u.id

WHERE u.teacher_id = $1

    ORDER BY created_at DESC

    LIMIT 40
  `;

  const result = await pool.query(query, [teacherId]);

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

    FROM exercise_history eh

INNER JOIN users u
ON eh.user_id=u.id

WHERE
u.teacher_id=$1
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

    FROM exercise_history eh

INNER JOIN users u
ON eh.user_id=u.id

WHERE u.teacher_id=$1

    GROUP BY difficulty
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
}

async function getTeacherStudents(teacherId) {
  const query = `
    SELECT
      u.id,
      u.email,

      COUNT(eh.id) AS attempts,

      COUNT(*) FILTER (
        WHERE eh.is_correct = true
      ) AS correct

    FROM users u

    LEFT JOIN exercise_history eh
      ON eh.user_id = u.id

    WHERE
      u.teacher_id = $1

    GROUP BY
      u.id,
      u.email

    ORDER BY
      u.email
  `;

  const result = await pool.query(query, [teacherId]);

  return result.rows.map((student) => {
    const attempts = Number(student.attempts);

    const correct = Number(student.correct);

    const accuracy =
      attempts === 0 ? 0 : Math.round((correct / attempts) * 100);

    return {
      id: student.id,
      email: student.email,
      attempts,
      correct,
      accuracy,
    };
  });
}

async function getTeacherStudentDashboard(teacherId, studentId) {
  const studentQuery = `
    SELECT
      id,
      email,
      teacher_id
    FROM users
    WHERE id = $1
      AND role = 'student'
  `;

  const studentResult = await pool.query(studentQuery, [studentId]);

  if (studentResult.rows.length === 0) {
    return null;
  }

  const student = studentResult.rows[0];

  if (student.teacher_id !== teacherId) {
    return "FORBIDDEN";
  }

  const statsQuery = `
    SELECT
      COUNT(*) AS attempts,

      COUNT(*) FILTER (
        WHERE is_correct = true
      ) AS correct

    FROM exercise_history

    WHERE user_id = $1
  `;

  const statsResult = await pool.query(statsQuery, [studentId]);

  const attempts = Number(statsResult.rows[0].attempts);

  const correct = Number(statsResult.rows[0].correct);

  const accuracy = attempts === 0 ? 0 : Math.round((correct / attempts) * 100);

  return {
    student: {
      id: student.id,
      email: student.email,
    },

    stats: {
      attempts,
      correct,
      accuracy,
    },
  };
}

module.exports = {
  getTeacherDashboard,
  getAccuracyOverTime,
  getMostCommonErrors,
  getExercisesByDifficulty,
  getTeacherStudents,
  getTeacherStudentDashboard,
};
