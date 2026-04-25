const bcrypt = require("bcryptjs");

// Temporary in-memory storage for users (replaces a database for now)
const users = [];

//Handles the registration of a new user
async function registerUser(email, password) {
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return { error: "User already exists" };
  }

  // Secure the password using hashing before saving it
  // 10 salt rounds standard for balance between security and speed
  const hashedPassword = await bcrypt.hash(password, 10);

  //Create new user
  const newUser = {
    id: users.length + 1,
    email,
    password: hashedPassword,
  };

  users.push(newUser);

  return { user: newUser };
}

//User authentication
async function loginUser(email, password) {
  const user = users.find((user) => user.email === email);

  if (!user) {
    return { error: "User not found" };
  }

  //compares password from login attempt with stored password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { error: "Invalid password" };
  }

  return { user };
}

module.exports = {
  registerUser,
  loginUser,
};
