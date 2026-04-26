import { useState } from "react";
import { loginUserApi } from "../services/api";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUserApi({
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      onLogin();
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center">
          Welcome Back
        </h1>

        <p className="text-gray-600 text-center mt-2">
          Login to continue to DerivaLab
        </p>

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
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
