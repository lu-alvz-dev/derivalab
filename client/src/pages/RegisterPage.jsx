import { useState } from "react";
import { registerUserApi } from "../services/api";

function RegisterPage({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    try {
      await registerUserApi({
        email,
        password,
      });
      setErrorMessage("");
      onRegister();
    } catch (error) {
      console.error("Registration failed", error);

      const message = error.response?.data?.message || "Registration failed";

      setErrorMessage(message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center">
          Create Account
        </h1>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="teacher@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Register
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
