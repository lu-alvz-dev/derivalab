const pool = require("../config/db");
const bcrypt = require("bcryptjs");

async function registerUser(email, password, role = "teacher", teacherId) {
  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );

  if (existingUser.rows.length > 0) {
    throw new Error("User already exists");
  }

  if (role === "student" && !teacherId) {
    throw new Error("Teacher ID is required.");
  }
  if (role === "student") {
    const teacher = await pool.query(
      `
    SELECT id
    FROM users
    WHERE id = $1
      AND role = 'teacher'
    `,
      [teacherId],
    );

    if (teacher.rows.length === 0) {
      throw new Error("Teacher not found.");
    }
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users (email, password, role, teacher_id)VALUES ($1, $2, $3, $4) RETURNING id, email, role, teacher_id",
    [email, hashedPassword, role, teacherId],
  );

  return result.rows[0];
}

async function loginUser(email, password) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
}

module.exports = {
  registerUser,
  loginUser,
};
