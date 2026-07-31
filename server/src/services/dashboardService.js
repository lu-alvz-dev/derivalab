const pool = require("../config/db");
const { MAX_RECENT_ATTEMPTS } = require("../config/dashboardConfig");

async function validateTeacherStudent(teacherId, studentId) {
  const query = `
    SELECT
      u.id,
      u.email
    FROM users u
    WHERE
      u.id = $1
      AND u.role = 'student'
      AND u.teacher_id = $2
  `;

  const result = await pool.query(query, [studentId, teacherId]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}

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
      eh.id,
      eh.created_at,
      eh.is_correct

    FROM exercise_history eh

    INNER JOIN users u
      ON eh.user_id = u.id

    WHERE
      u.teacher_id = $1

    ORDER BY
      eh.created_at DESC,
      eh.id DESC

    LIMIT ${MAX_RECENT_ATTEMPTS}
  `;

  const result = await pool.query(query, [teacherId]);

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

async function getMostCommonErrors(teacherId) {
  const query = `
    SELECT
      eh.error_type,
      COUNT(*) AS count

    FROM exercise_history eh

    INNER JOIN users u
      ON eh.user_id = u.id

    WHERE
      u.teacher_id = $1
      AND eh.error_type IS NOT NULL

    GROUP BY
      eh.error_type

    ORDER BY
      count DESC
  `;

  const result = await pool.query(query, [teacherId]);

  return result.rows;
}

async function getExercisesByDifficulty(teacherId) {
  const query = `
    SELECT
      eh.difficulty,
      COUNT(*) AS count

    FROM exercise_history eh

    INNER JOIN users u
      ON eh.user_id = u.id

    WHERE
      u.teacher_id = $1

    GROUP BY
      eh.difficulty

    ORDER BY
      eh.difficulty
  `;

  const result = await pool.query(query, [teacherId]);

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
      ) AS correct,

      MAX(eh.created_at) AS last_activity

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

      lastActivity: student.last_activity,
    };
  });
}

async function getTeacherStudentDashboard(teacherId, studentId) {
  const student = await validateTeacherStudent(teacherId, studentId);

  if (!student) {
    return "FORBIDDEN";
  }

  const statsQuery = `
    SELECT
      COUNT(*) AS attempts,

      COUNT(*) FILTER (
        WHERE eh.is_correct = true
      ) AS correct

    FROM exercise_history eh

    WHERE
      eh.user_id = $1
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

async function getTeacherStudentHistory(teacherId, studentId) {
  const student = await validateTeacherStudent(teacherId, studentId);

  if (!student) {
    return "FORBIDDEN";
  }

  const historyQuery = `
    SELECT
      eh.id,
      eh.question,
      eh.correct_answer,
      eh.user_answer,
      eh.exercise_type,
      eh.difficulty,
      eh.is_correct,
      eh.error_type,
      eh.created_at

    FROM exercise_history eh

    WHERE
      eh.user_id = $1

    ORDER BY
      eh.created_at DESC
  `;

  const historyResult = await pool.query(historyQuery, [studentId]);

  return historyResult.rows;
}

async function getTeacherStudentAccuracy(teacherId, studentId) {
  const student = await validateTeacherStudent(teacherId, studentId);

  if (!student) {
    return "FORBIDDEN";
  }

  const accuracyQuery = `
    SELECT
      eh.id,
      eh.created_at,
      eh.is_correct

    FROM exercise_history eh

    WHERE
      eh.user_id = $1

    ORDER BY
      eh.created_at DESC,
      eh.id DESC

    LIMIT $2
  `;

  const result = await pool.query(accuracyQuery, [
    studentId,
    MAX_RECENT_ATTEMPTS,
  ]);

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

async function getTeacherStudentErrors(teacherId, studentId) {
  const student = await validateTeacherStudent(teacherId, studentId);

  if (!student) {
    return "FORBIDDEN";
  }

  const errorsQuery = `
    SELECT
      eh.error_type,
      COUNT(*) AS count

    FROM exercise_history eh

    WHERE
      eh.user_id = $1
      AND eh.error_type IS NOT NULL

    GROUP BY
      eh.error_type

    ORDER BY
      count DESC
  `;

  const result = await pool.query(errorsQuery, [studentId]);

  return result.rows;
}

async function getTeacherStudentDifficulty(teacherId, studentId) {
  const student = await validateTeacherStudent(teacherId, studentId);

  if (!student) {
    return "FORBIDDEN";
  }

  const difficultyQuery = `
    SELECT
      eh.difficulty,
      COUNT(*) AS count

    FROM exercise_history eh

    WHERE
      eh.user_id = $1

    GROUP BY
      eh.difficulty

    ORDER BY
      eh.difficulty
  `;

  const result = await pool.query(difficultyQuery, [studentId]);

  return result.rows;
}

module.exports = {
  validateTeacherStudent,
  getTeacherDashboard,
  getAccuracyOverTime,
  getMostCommonErrors,
  getExercisesByDifficulty,
  getTeacherStudents,
  getTeacherStudentDashboard,
  getTeacherStudentHistory,
  getTeacherStudentAccuracy,
  getTeacherStudentErrors,
  getTeacherStudentDifficulty,
};
