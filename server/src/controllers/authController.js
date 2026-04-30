const jwt = require("jsonwebtoken");
const { registerUser, loginUser } = require("../services/userService");

const SECRET_KEY = process.env.JWT_SECRET;

async function register(req, res) {
  const { email, password } = req.body;

  const result = await registerUser(email, password);

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  res.status(201).json({
    message: "User registered successfully",
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const result = await loginUser(email, password);

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  const token = jwt.sign(
    {
      userId: result.id,
      role: result.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.json({
    message: "Login successful",
    token,
  });
}

module.exports = {
  register,
  login,
};
