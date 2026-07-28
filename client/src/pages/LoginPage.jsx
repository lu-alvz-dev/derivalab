import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { loginUserApi } from "../services/api";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = location.state?.successMessage;

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUserApi({
        email,
        password,
      });

      login(response.data.user, response.data.token);

      setErrorMessage("");

      const user = response.data.user;

      if (user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);

      const message = error.response?.data?.message || "Something went wrong";

      setErrorMessage(message);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center">
          Welcome Back
        </h1>

        {successMessage && (
          <div className="mt-4 rounded-lg border border-green-300 bg-green-50 p-3 text-green-700">
            {successMessage}
          </div>
        )}

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
            className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-lg
              transition-colors
              hover:bg-blue-700
            "
          >
            Login
          </button>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 space-y-4 text-center">
          <p className="text-sm text-slate-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-semibold text-blue-600 hover:underline"
            >
              Create one
            </button>
          </p>

          <button
            onClick={() => navigate("/")}
            className="
              inline-flex
              items-center
              text-sm
              font-medium
              text-blue-600
              transition-colors
              hover:text-blue-700
              hover:underline
            "
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
