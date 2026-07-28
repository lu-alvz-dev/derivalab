import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUserApi } from "../services/api";

function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher");
  const [errorMessage, setErrorMessage] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const handleRegister = async () => {
    try {
      await registerUserApi({
        email,
        password,
        role,
        teacher_id: role === "student" ? Number(teacherId) : null,
      });

      setErrorMessage("");

      navigate("/login", {
        state: {
          successMessage:
            "Your account has been created successfully. Please log in.",
        },
      });
    } catch (error) {
      console.error("Registration failed", error);

      const message = error.response?.data?.message || "Registration failed";

      setErrorMessage(message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
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

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>

          {role === "student" && (
            <>
              <input
                type="number"
                placeholder="Teacher ID"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                className="w-full border rounded-lg p-3"
              />

              <p className="text-sm text-gray-500">
                Enter the Teacher ID provided by your instructor.
              </p>
            </>
          )}

          <button
            onClick={handleRegister}
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
            Register
          </button>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 space-y-4 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
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

export default RegisterPage;
