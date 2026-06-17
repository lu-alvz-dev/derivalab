import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PracticePage from "./pages/PracticePage";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import { loginUserApi } from "./services/api";

function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <>
      {currentView === "landing" && (
        <LandingPage
          onLogin={() => setCurrentView("login")}
          onRegister={() => setCurrentView("register")}
          onDemo={async () => {
            try {
              const response = await loginUserApi({
                email: "demo@derivalab.com",
                password: "Demo123!",
              });

              localStorage.setItem("token", response.data.token);

              setCurrentView("app");
            } catch (error) {
              console.error("Demo login failed", error);
            }
          }}
        />
      )}

      {currentView === "register" && (
        <RegisterPage
          onRegister={() => {
            setSuccessMessage("Account created successfully. Please log in.");
            setCurrentView("login");
          }}
        />
      )}

      {currentView === "login" && (
        <LoginPage
          successMessage={successMessage}
          onLogin={(response) => {
            if (response.user.role === "teacher") {
              setCurrentView("teacher-dashboard");
            } else {
              setCurrentView("student-dashboard");
            }
          }}
        />
      )}

      {currentView === "app" && <PracticePage />}
      {currentView === "teacher-dashboard" && <TeacherDashboard />}
      {currentView === "student-dashboard" && <StudentDashboard />}
    </>
  );
}

export default App;
